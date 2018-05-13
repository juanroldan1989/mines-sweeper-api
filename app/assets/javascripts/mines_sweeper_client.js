console.log("MineSweeper JS library loaded!");

var VERSION     = "v1";
var MineSweeper = (function ($) {
  return {

    createGame: function(rows, columns, mines) {
      $.ajax({
        type : "POST",
        url  : VERSION + "/games",
        data : { game: { rows: rows, columns: columns, mines: mines } },
        beforeSend: function(xhr){
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        success  : function(data){
          console.log(data);
        },
        error : function(data){
          console.log(data);
        }
      });
    },

    getGame: function(gameId) {
      $.ajax({
        type  : "GET",
        url   : VERSION + "/games/" + gameId,
        data  : { },
        beforeSend: function(xhr){
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        success  : function(data){
          console.log(data);
          MineSweeper.drawGame(data);
        },
        error : function(data){
          console.log(data);
        }
      });
    },

    drawGame: function(gameData) {
      var rows            = gameData.rows;
      var columns         = gameData.columns;
      var minesPositions  = gameData.mines_positions;
      var squaresRevealed = gameData.squares_revealed;
      var squaresFlagged  = gameData.squares_flagged;

      var gameTable = $("#game");
      gameTable.html("");

      var mines = {};
      for(var i = 0 ; i < minesPositions.length; i += 1) {
        mines[minesPositions[i]] = i;
      }

      var revealed = {};
      for(var i = 0 ; i < squaresRevealed.length; i += 1) {
        revealed[squaresRevealed[i]] = i;
      }

      for (var i = 0; i < rows; i++) {
        var row = $('<tr></tr>').appendTo(gameTable);
        for (var j = 0; j < columns; j++) {

          // check if square(i,j) has been revealed
          if (revealed.hasOwnProperty([i,j])) {
            // check if square(i,j) contains a bomb
            if(mines.hasOwnProperty([i,j])) {
              $("<td class='alert callout'></td>").text("x").appendTo(row);
            } else {
              $("<td data-behavior='square' data-game-id=" + gameData.id + " data-row=" + i + " data-column=" + j +" class='secondary callout'></td>").text("").appendTo(row);
            }
          } else {
            // square unrevealed
            $("<td data-behavior='square' data-game-id=" + gameData.id + " data-row=" + i + " data-column=" + j +" class='callout'></td>").text("").appendTo(row);
          }
        }
      }
    },

    // `action` param possible values: `reveal`, `question_mark` or `red_flag`
    updateSquare: function(gameId, row, column, action) {
      $.ajax({
        type : "PUT",
        url  : VERSION + "/games/" + gameId + "/squares",
        data : { square: { row: row, column: column, action: action } },
        beforeSend: function(xhr){
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        success  : function(data){
          console.log(data);
          MineSweeper.drawGame(data);
        },
        error : function(data){
          console.log(data);
        }
      });
    }
  };
})(jQuery);
