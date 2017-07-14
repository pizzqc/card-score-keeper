package com.pizz.scorekeeper.repository;

import com.pizz.scorekeeper.domain.GameSession;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GameSession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameSessionRepository extends JpaRepository<GameSession,Long> {
    
}
