jsonRead();
function jsonRead() {
  var obj = {
     table: []
  };

  obj.table.push({id: 1, square:2});
  var json = JSON.stringify(obj);
  var url = 'https://tinkershop.github.io/data/instagram.json';

  $.getJSON(url, function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      $.each( val, function( key1, val1 ) {
        items.push(
          '<div class="col-sm-6 col-md-4">' +
            '<div class="panel panel-default">' +
              '<div class="panel-heading"></div>' +
                '<div class="panel-body panel-instagram">' +
                  '<img src="' + val1.media_url + '" style="width: 100%;"></img>' +
                '</div>' +
              '<div class="panel-footer"></div>' +
            '</div>' +
          '</div>'
        );
      });
    });
   
    $( "<div/>", {
      "class": "list",
      html: items.join( "" )
    }).prependTo( "#allTab" );
  });
}
