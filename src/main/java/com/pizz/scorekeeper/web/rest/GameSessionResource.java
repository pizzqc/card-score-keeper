package com.pizz.scorekeeper.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pizz.scorekeeper.service.GameSessionService;
import com.pizz.scorekeeper.web.rest.util.HeaderUtil;
import com.pizz.scorekeeper.web.rest.util.PaginationUtil;
import com.pizz.scorekeeper.service.dto.GameSessionDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing GameSession.
 */
@RestController
@RequestMapping("/api")
public class GameSessionResource {

    private final Logger log = LoggerFactory.getLogger(GameSessionResource.class);

    private static final String ENTITY_NAME = "gameSession";

    private final GameSessionService gameSessionService;

    public GameSessionResource(GameSessionService gameSessionService) {
        this.gameSessionService = gameSessionService;
    }

    /**
     * POST  /game-sessions : Create a new gameSession.
     *
     * @param gameSessionDTO the gameSessionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gameSessionDTO, or with status 400 (Bad Request) if the gameSession has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/game-sessions")
    @Timed
    public ResponseEntity<GameSessionDTO> createGameSession(@RequestBody GameSessionDTO gameSessionDTO) throws URISyntaxException {
        log.debug("REST request to save GameSession : {}", gameSessionDTO);
        if (gameSessionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new gameSession cannot already have an ID")).body(null);
        }
        GameSessionDTO result = gameSessionService.save(gameSessionDTO);
        return ResponseEntity.created(new URI("/api/game-sessions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /game-sessions : Updates an existing gameSession.
     *
     * @param gameSessionDTO the gameSessionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gameSessionDTO,
     * or with status 400 (Bad Request) if the gameSessionDTO is not valid,
     * or with status 500 (Internal Server Error) if the gameSessionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/game-sessions")
    @Timed
    public ResponseEntity<GameSessionDTO> updateGameSession(@RequestBody GameSessionDTO gameSessionDTO) throws URISyntaxException {
        log.debug("REST request to update GameSession : {}", gameSessionDTO);
        if (gameSessionDTO.getId() == null) {
            return createGameSession(gameSessionDTO);
        }
        GameSessionDTO result = gameSessionService.save(gameSessionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gameSessionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /game-sessions : get all the gameSessions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of gameSessions in body
     */
    @GetMapping("/game-sessions")
    @Timed
    public ResponseEntity<List<GameSessionDTO>> getAllGameSessions(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of GameSessions");
        Page<GameSessionDTO> page = gameSessionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/game-sessions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /game-sessions/:id : get the "id" gameSession.
     *
     * @param id the id of the gameSessionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gameSessionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/game-sessions/{id}")
    @Timed
    public ResponseEntity<GameSessionDTO> getGameSession(@PathVariable Long id) {
        log.debug("REST request to get GameSession : {}", id);
        GameSessionDTO gameSessionDTO = gameSessionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(gameSessionDTO));
    }

    /**
     * DELETE  /game-sessions/:id : delete the "id" gameSession.
     *
     * @param id the id of the gameSessionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/game-sessions/{id}")
    @Timed
    public ResponseEntity<Void> deleteGameSession(@PathVariable Long id) {
        log.debug("REST request to delete GameSession : {}", id);
        gameSessionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
