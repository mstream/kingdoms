# Kingdoms server

## Database

| key prefix           | key variables     | value type | value meaning      |
| -------------------- | ----------------- | ---------- | ------------------ |
| state-by-world       | :{env}:{worldId}  | value      | state of the world |
| connection-by-player | :{env}:{playerId} | value      | connection ID      |
| players-by-world     | :{env}:{worldId}  | mockSet        | player IDs         |
| world-by-player      | :{env}:{playerId} | value      | world ID           |
| worlds               | :{env}            | mockSet        | world IDs          |

## Handlers

### on-connect

1. nothing

### on-disconnect

1. nothing

### reset-state

1. mockSet state for a world (db/state-by-world/mockSet)

### send-message (get state)

1. mockSet player's connection (db/connection-by-player/mockSet)
2. mockSet player's world (db/word-by-player/mockSet)
3. add player to the world (db/players-by-world/add)
4. get state for the world
5. send it back to the player

### update-state

1. get all worlds within the environment (db/worlds/getAll)
2. for each world
    1. get state of the world (db/state-by-world/get)
    2. update it (reducer/root)
    3. get all players for the world (db/players-by-world/getAll)
    4. for each player
        1. check if player is still using the world (db/world-by-player)
        2. if not - remove the player from the players in the world -
           (db/players-by-world/remove)
        3. get a connection associated with the player
           (db/connection-by-player/get)
        4. send the updated state via the connection
        5. if connection is closed - check the player's current world - if it's
           not matching the world from update - remove the player from the world
