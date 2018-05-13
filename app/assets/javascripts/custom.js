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
