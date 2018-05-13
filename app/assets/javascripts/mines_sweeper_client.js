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

      for (var i = 0; i < rows; i++) {
        var row = $('<tr></tr>').appendTo(gameTable);
        for (var j = 0; j < columns; j++) {
          $("<td data-row=" + i + " data-column=" + j +" class='callout'></td>").text("").appendTo(row);
        }
      }
      // console.log("gameTable:" + gameTable.html());
    }
  };
})(jQuery);
