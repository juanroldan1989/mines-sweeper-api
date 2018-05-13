<div align="left">
  <a href="https://github.com/juanroldan1989/mines-sweeper-api"><img width="250" src="https://d30y9cdsu7xlg0.cloudfront.net/png/206685-200.png" alt="login-app logo" /></a>
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


### Testing steps

1. Access `testing` area where JS Library will be loaded within the page.

2. `Create` a game:
```javascript
MineSweeper.createGame(10,10,4);
```

3. `Fetch` a game to play:
```javascript
MineSweeper.getGame(1);
```

4. Start clicking around and revealing squares : )

```javascript
MineSweeper.updateSquare(1, 10, 8, 'reveal');
MineSweeper.updateSquare(1, 5, 2, 'question_mark');
```

4. a) Square revealed doesn't contain a bomb, phew !
4. b) Square revealed contains a bomb! (game over, clicking around doesn't make any changes in the server side)
4. c) Squares can be flagged with a `question mark` (by clicking with the right button mouse).

Enjoy !
