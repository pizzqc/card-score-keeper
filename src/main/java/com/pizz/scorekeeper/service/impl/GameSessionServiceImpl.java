package com.pizz.scorekeeper.service.impl;

import com.pizz.scorekeeper.service.GameSessionService;
import com.pizz.scorekeeper.domain.GameSession;
import com.pizz.scorekeeper.repository.GameSessionRepository;
import com.pizz.scorekeeper.service.dto.GameSessionDTO;
import com.pizz.scorekeeper.service.mapper.GameSessionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing GameSession.
 */
@Service
@Transactional
public class GameSessionServiceImpl implements GameSessionService{

    private final Logger log = LoggerFactory.getLogger(GameSessionServiceImpl.class);

    private final GameSessionRepository gameSessionRepository;

    private final GameSessionMapper gameSessionMapper;

    public GameSessionServiceImpl(GameSessionRepository gameSessionRepository, GameSessionMapper gameSessionMapper) {
        this.gameSessionRepository = gameSessionRepository;
        this.gameSessionMapper = gameSessionMapper;
    }

    /**
     * Save a gameSession.
     *
     * @param gameSessionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GameSessionDTO save(GameSessionDTO gameSessionDTO) {
        log.debug("Request to save GameSession : {}", gameSessionDTO);
        GameSession gameSession = gameSessionMapper.toEntity(gameSessionDTO);
        gameSession = gameSessionRepository.save(gameSession);
        return gameSessionMapper.toDto(gameSession);
    }

    /**
     *  Get all the gameSessions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<GameSessionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all GameSessions");
        return gameSessionRepository.findAll(pageable)
            .map(gameSessionMapper::toDto);
    }

    /**
     *  Get one gameSession by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public GameSessionDTO findOne(Long id) {
        log.debug("Request to get GameSession : {}", id);
        GameSession gameSession = gameSessionRepository.findOne(id);
        return gameSessionMapper.toDto(gameSession);
    }

    /**
     *  Delete the  gameSession by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GameSession : {}", id);
        gameSessionRepository.delete(id);
    }
}
