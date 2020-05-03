# Kingdoms server

## Database 
| key prefix           | key variables     | value type | value meaning      |
| -------------------- | ----------------- | ---------- | ------------------ |
| state-by-world       | :{env}:{worldId}  | value      | state of the world |
| connection-by-player | :{env}:{playerId} | value      | connection ID      |
| players-by-world     | :{env}:{worldId}  | set        | player IDs         |
| world-by-player      | :{env}:{playerId} | value      | world ID           |
| worlds               | :{env}            | set        | world IDs          |

## Queues 
| name               | payload                       |
| ------------------ | ----------------------------- | 
| world-state-update | {state:string,worldId:string} | 


## Handlers

### on-connect
nothing

### on-disconnect
nothing

### reset-state
1. set state of a world ([db/state-by-world/set](#database))

### send-message (get state)
1. set player's connection ([db/connection-by-player/set](#database))
2. set player's world ([db/world-by-player/set](#database))
3. add player to the world ([db/players-by-world/add](#database))
4. get state for the world ([db/state-by-world/get](#database))
5. send it back to the player

### update-redis-metrics
1. get all worlds
2. emit a metric with their count

### update-state
1. get all worlds within the environment ([db/worlds/getAll](#database))
2. for each world
    1. get state of the world ([db/state-by-world/get](#database))
    2. update it ([reducer/root]())
    3. send a message with the update information ([queue/world-state-update](#queues))
    3. get all players for the world ([db/players-by-world/getAll](#database))
    4. for each player
        1. check if player is still using the world ([db/world-by-player](#database))
        2. if not - remove the player from the players in the world -
           ([db/players-by-world/remove](#database))
        3. get a connection associated with the player
           ([db/connection-by-player/get](#database))
        4. send the updated state via the connection
        5. if connection is closed - check the player's current world - if it's
           not matching the world from update - remove the player from the world
           
### broadcast-state
1. get a message with a state update information ([queue/world-state-update](#queues))
2. get all players for the world which the update is for ([db/players-by-world/getAll](#database))
3. for each player
    1. check if player is still using the world ([db/world-by-player](#database))
    2. if not - remove the player from the players in the world -
       ([db/players-by-world/remove](#database))
    3. get a connection associated with the player
       ([db/connection-by-player/get](#database))
    4. send the updated state via the connection
    5. if connection is closed - check the player's current world - if it's
       not matching the world from update - remove the player from the world