<div align="left">
  <a href="https://github.com/juanroldan1989/mines-sweeper-api"><img width="250" src="https://github.com/juanroldan1989/mines-sweeper-api/raw/master/app/assets/images/login.png" alt="login-app logo" /></a>
</div>

# MineSweeper API & JS Library

RESTful API for the classic game & API client library - 5 hours test exercise

### Features implemented

#### MineSweeper JS Library

- `createGame` function. Parameters: (rows, columns, mines)
- `getGame` function. Parameters: (gameId)
- `drawGame` function. Parameters: (gameData)
- `updateSquare` function. Parameters: (gameId, row, column, action)


#### MineSweeper API

- Current API Version available: V1
- Games `CREATE` endpoint: POST `/games`. Params: (rows, columns, mines)
- Games `SHOW` endpoint: GET `/games/:id`. Params: (id)
- Squares `UPDATE` endpoint: PUT `/games/:game_id/squares`. Params: (game_id, row, column, action). `game_id` must belong to an existing Game. `row` must be an integer. `column` must be an integer. `action` must be one of these 3 values: `reveal`, `question_mark` or `red_flag`.


### Development

Clone repository:
```
$ git clone git@github.com:juanroldan1989/mines-sweeper-api.git
```

Install gems:
```
$ bundle install
```

Setup DB:
```
$ cp config/database.yml.sample config/database.yml
$ rake db:create db:migrate
```

Run server:
```
$ rails s
```

### Live app
- https://mines-sweeper-api.herokuapp.com/
