package com.pizz.scorekeeper.service.mapper;

import com.pizz.scorekeeper.domain.*;
import com.pizz.scorekeeper.service.dto.GameSessionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GameSession and its DTO GameSessionDTO.
 */
@Mapper(componentModel = "spring", uses = {GameMapper.class, PlayerMapper.class, })
public interface GameSessionMapper extends EntityMapper <GameSessionDTO, GameSession> {

    @Mapping(source = "game.id", target = "gameId")

    @Mapping(source = "player.id", target = "playerId")
    GameSessionDTO toDto(GameSession gameSession); 

    @Mapping(source = "gameId", target = "game")

    @Mapping(source = "playerId", target = "player")
    GameSession toEntity(GameSessionDTO gameSessionDTO); 
    default GameSession fromId(Long id) {
        if (id == null) {
            return null;
        }
        GameSession gameSession = new GameSession();
        gameSession.setId(id);
        return gameSession;
    }
}
