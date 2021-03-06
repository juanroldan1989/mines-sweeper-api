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
1. Games `CREATE` endpoint: POST `/games`. Params: (rows, columns, mines)

1. a) On success returns:
```ruby
{ id: 2, rows: 10, columns: 10, mines: 5, mines_positions: Array(5) ...
```

1. b) On failure returns:
```ruby
{ status: 400, message: "Game can't be created", errors: [...] }
```

2. Games `SHOW` endpoint: GET `/games/:id`. Params: (id)

2. a) On sucess returns:
```ruby
{ id: 2, rows: 10, columns: 10, mines: 5, mines_positions: Array(5) ...
```

2. b) On failure returns:
```ruby
{ status: 404, message: "Game not found" }
```

3. Squares `UPDATE` endpoint: PUT `/games/:game_id/squares`. Params: (game_id, row, column, action). `game_id` must belong to an existing Game. `row` must be an integer. `column` must be an integer. `action` must be one of these 3 values: `reveal`, `question_mark` or `red_flag`.


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

1. Access `testing` area where JS Library will be loaded within the page: https://mines-sweeper-api.herokuapp.com/testing

2. `Create` a game:
```javascript
// inside browser's console

MineSweeper.createGame(10,10,4);
```

3. `Fetch` a game to play using the `id` returned on the previous step:
```javascript
// inside browser's console

MineSweeper.getGame(1);
```

4. Start clicking around and revealing squares : )

```javascript
// OR you can use the JS library from inside browser's console

MineSweeper.updateSquare(1, 10, 8, 'reveal');
MineSweeper.updateSquare(1, 5, 2, 'question_mark');
```

4. a) Square revealed doesn't contain a bomb, phew !
4. b) Square revealed contains a bomb! (game over, clicking around doesn't make any changes in the server side)
4. c) Squares can be flagged with a `question mark` (by clicking with the right button mouse).

Enjoy !
