package com.pizz.scorekeeper.web.rest;

import com.pizz.scorekeeper.ScorekeeperApp;

import com.pizz.scorekeeper.domain.GameSession;
import com.pizz.scorekeeper.repository.GameSessionRepository;
import com.pizz.scorekeeper.service.GameSessionService;
import com.pizz.scorekeeper.service.dto.GameSessionDTO;
import com.pizz.scorekeeper.service.mapper.GameSessionMapper;
import com.pizz.scorekeeper.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.pizz.scorekeeper.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pizz.scorekeeper.domain.enumeration.GameType;
/**
 * Test class for the GameSessionResource REST controller.
 *
 * @see GameSessionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ScorekeeperApp.class)
public class GameSessionResourceIntTest {

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final GameType DEFAULT_GAME_TYPE = GameType.CARD;
    private static final GameType UPDATED_GAME_TYPE = GameType.DICE;

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @Autowired
    private GameSessionMapper gameSessionMapper;

    @Autowired
    private GameSessionService gameSessionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGameSessionMockMvc;

    private GameSession gameSession;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        GameSessionResource gameSessionResource = new GameSessionResource(gameSessionService);
        this.restGameSessionMockMvc = MockMvcBuilders.standaloneSetup(gameSessionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameSession createEntity(EntityManager em) {
        GameSession gameSession = new GameSession()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .gameType(DEFAULT_GAME_TYPE);
        return gameSession;
    }

    @Before
    public void initTest() {
        gameSession = createEntity(em);
    }

    @Test
    @Transactional
    public void createGameSession() throws Exception {
        int databaseSizeBeforeCreate = gameSessionRepository.findAll().size();

        // Create the GameSession
        GameSessionDTO gameSessionDTO = gameSessionMapper.toDto(gameSession);
        restGameSessionMockMvc.perform(post("/api/game-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameSessionDTO)))
            .andExpect(status().isCreated());

        // Validate the GameSession in the database
        List<GameSession> gameSessionList = gameSessionRepository.findAll();
        assertThat(gameSessionList).hasSize(databaseSizeBeforeCreate + 1);
        GameSession testGameSession = gameSessionList.get(gameSessionList.size() - 1);
        assertThat(testGameSession.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testGameSession.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testGameSession.getGameType()).isEqualTo(DEFAULT_GAME_TYPE);
    }

    @Test
    @Transactional
    public void createGameSessionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameSessionRepository.findAll().size();

        // Create the GameSession with an existing ID
        gameSession.setId(1L);
        GameSessionDTO gameSessionDTO = gameSessionMapper.toDto(gameSession);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameSessionMockMvc.perform(post("/api/game-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameSessionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<GameSession> gameSessionList = gameSessionRepository.findAll();
        assertThat(gameSessionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGameSessions() throws Exception {
        // Initialize the database
        gameSessionRepository.saveAndFlush(gameSession);

        // Get all the gameSessionList
        restGameSessionMockMvc.perform(get("/api/game-sessions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameSession.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))))
            .andExpect(jsonPath("$.[*].gameType").value(hasItem(DEFAULT_GAME_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getGameSession() throws Exception {
        // Initialize the database
        gameSessionRepository.saveAndFlush(gameSession);

        // Get the gameSession
        restGameSessionMockMvc.perform(get("/api/game-sessions/{id}", gameSession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gameSession.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.gameType").value(DEFAULT_GAME_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGameSession() throws Exception {
        // Get the gameSession
        restGameSessionMockMvc.perform(get("/api/game-sessions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGameSession() throws Exception {
        // Initialize the database
        gameSessionRepository.saveAndFlush(gameSession);
        int databaseSizeBeforeUpdate = gameSessionRepository.findAll().size();

        // Update the gameSession
        GameSession updatedGameSession = gameSessionRepository.findOne(gameSession.getId());
        updatedGameSession
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .gameType(UPDATED_GAME_TYPE);
        GameSessionDTO gameSessionDTO = gameSessionMapper.toDto(updatedGameSession);

        restGameSessionMockMvc.perform(put("/api/game-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameSessionDTO)))
            .andExpect(status().isOk());

        // Validate the GameSession in the database
        List<GameSession> gameSessionList = gameSessionRepository.findAll();
        assertThat(gameSessionList).hasSize(databaseSizeBeforeUpdate);
        GameSession testGameSession = gameSessionList.get(gameSessionList.size() - 1);
        assertThat(testGameSession.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testGameSession.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testGameSession.getGameType()).isEqualTo(UPDATED_GAME_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingGameSession() throws Exception {
        int databaseSizeBeforeUpdate = gameSessionRepository.findAll().size();

        // Create the GameSession
        GameSessionDTO gameSessionDTO = gameSessionMapper.toDto(gameSession);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGameSessionMockMvc.perform(put("/api/game-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameSessionDTO)))
            .andExpect(status().isCreated());

        // Validate the GameSession in the database
        List<GameSession> gameSessionList = gameSessionRepository.findAll();
        assertThat(gameSessionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGameSession() throws Exception {
        // Initialize the database
        gameSessionRepository.saveAndFlush(gameSession);
        int databaseSizeBeforeDelete = gameSessionRepository.findAll().size();

        // Get the gameSession
        restGameSessionMockMvc.perform(delete("/api/game-sessions/{id}", gameSession.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GameSession> gameSessionList = gameSessionRepository.findAll();
        assertThat(gameSessionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameSession.class);
        GameSession gameSession1 = new GameSession();
        gameSession1.setId(1L);
        GameSession gameSession2 = new GameSession();
        gameSession2.setId(gameSession1.getId());
        assertThat(gameSession1).isEqualTo(gameSession2);
        gameSession2.setId(2L);
        assertThat(gameSession1).isNotEqualTo(gameSession2);
        gameSession1.setId(null);
        assertThat(gameSession1).isNotEqualTo(gameSession2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameSessionDTO.class);
        GameSessionDTO gameSessionDTO1 = new GameSessionDTO();
        gameSessionDTO1.setId(1L);
        GameSessionDTO gameSessionDTO2 = new GameSessionDTO();
        assertThat(gameSessionDTO1).isNotEqualTo(gameSessionDTO2);
        gameSessionDTO2.setId(gameSessionDTO1.getId());
        assertThat(gameSessionDTO1).isEqualTo(gameSessionDTO2);
        gameSessionDTO2.setId(2L);
        assertThat(gameSessionDTO1).isNotEqualTo(gameSessionDTO2);
        gameSessionDTO1.setId(null);
        assertThat(gameSessionDTO1).isNotEqualTo(gameSessionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gameSessionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gameSessionMapper.fromId(null)).isNull();
    }
}
