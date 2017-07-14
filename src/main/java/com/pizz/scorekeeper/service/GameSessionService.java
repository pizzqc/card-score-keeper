package com.pizz.scorekeeper.service;

import com.pizz.scorekeeper.service.dto.GameSessionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing GameSession.
 */
public interface GameSessionService {

    /**
     * Save a gameSession.
     *
     * @param gameSessionDTO the entity to save
     * @return the persisted entity
     */
    GameSessionDTO save(GameSessionDTO gameSessionDTO);

    /**
     *  Get all the gameSessions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<GameSessionDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" gameSession.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    GameSessionDTO findOne(Long id);

    /**
     *  Delete the "id" gameSession.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
