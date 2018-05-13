console.log("MineSweeper JS library loaded!")

var VERSION     = "v1"
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
        },
        error : function(data){
          console.log(data);
        }
      });
    }
  };
})(jQuery);
