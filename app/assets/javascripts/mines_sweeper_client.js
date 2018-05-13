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

      console.log("minesPositions: " + minesPositions);
      console.log("squaresRevealed: " + squaresRevealed);

      var gameTable = $("#game");
      gameTable.html("");

      var hash = {};
      for(var i = 0 ; i < minesPositions.length; i += 1) {
        hash[minesPositions[i]] = i;
      }

      for (var i = 0; i < rows; i++) {
        var row = $('<tr></tr>').appendTo(gameTable);
        for (var j = 0; j < columns; j++) {

          // check if square(i,j) is included within minesPositions array
          if(hash.hasOwnProperty([i,j])) {
            // square contains bomb
            $("<td class='alert callout'></td>").text("X").appendTo(row);
          } else {
            // square unrevealed
            $("<td data-behavior='square' data-game-id=" + gameData.id + " data-row=" + i + " data-column=" + j +" class='callout'></td>").text("").appendTo(row);
          }
        }
      }
      // console.log("gameTable:" + gameTable.html());
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

function setBindingOnSquares() {
  $("[data-behavior~=square]").on("click", function(e) {
    var gameId = $(this).data("game-id");
    var row    = $(this).data("row");
    var column = $(this).data("column");

    MineSweeper.updateSquare(gameId, row, column, 'reveal');

    e.preventDefault();
  });
}

$(document).ajaxComplete(function() {
  console.log("Triggered ajaxComplete handler.");
  setBindingOnSquares();
});
