function setRevealSquare() {
  $("[data-behavior~=square]").on("click", function(e) {
    var gameId = $(this).data("game-id");
    var row    = $(this).data("row");
    var column = $(this).data("column");

    MineSweeper.updateSquare(gameId, row, column, 'reveal');

    e.preventDefault();
  });
}

function setFlagSquare() {
  $("[data-behavior~=square]").on("contextmenu", function(e) {
    var gameId = $(this).data("game-id");
    var row    = $(this).data("row");
    var column = $(this).data("column");

    MineSweeper.updateSquare(gameId, row, column, 'question_mark');

    e.preventDefault();
  });
}

$(document).ajaxComplete(function() {
  // console.log("Triggered ajaxComplete handler.");
  setRevealSquare();
  setFlagSquare();
});
