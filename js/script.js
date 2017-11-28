jsonReadAll();
function jsonReadAll() {
  var url = 'https://tinkershop.github.io/data/all-without-feedback.json';
  $.getJSON(url, function( data ) {
    console.log(data);
    var items = [];
    $.each( data, function( key, val ) {
      $.each( val, function( key1, val1 ) {
        items.push(
          '<div class="col-sm-6 col-md-4">' +
            '<div class="panel panel-default">' +
              '<div class="panel-heading"></div>' +
                '<div onclick="instagramData(\'https://www.instagram.com/p/'+ val1.shortcode +'\')" class="panel-body panel-instagram">' +
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

    var monkeyList = new List('allTab', {
      page: 9,
      pagination: true
    });
  });
}

function jsonReadFeedback() {
  var url = 'https://tinkershop.github.io/data/feedback.json';
  $.getJSON(url, function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      $.each( val, function( key1, val1 ) {
        items.push(
          '<div class="col-sm-6 col-md-4">' +
            '<div class="panel panel-default">' +
              '<div class="panel-heading"></div>' +
                '<div onclick="instagramData(\'https://www.instagram.com/p/'+ val1.shortcode +'\')" class="panel-body panel-instagram">' +
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
    }).prependTo( "#feedbackTab" );

    var monkeyList = new List('feedbackTab', {
      page: 9,
      pagination: true
    });
  });
}

function instagramData(url) {
  $('#modalBody').html('<img class="loading-img" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif">');
  $('#modal-dialog').modal('show');
        
  $.getJSON(url+'?__a=1', function( data ) {
    var info = data.graphql.shortcode_media;
    var comments = [];
    $.each( info.edge_media_to_comment.edges, function( key, comment ) {
      comments.push(
        '<div>' +
          '<p><b>'+ comment.node.owner.username +'</b> '+ comment.node.text +'</p>' +
        '</div>'
      );
    });

    $('#modalBody').html(
      '<div class="row flex">' +
        '<div class="col-md-7 insta-img">' +
            '<img class="w100" src="'+ info.display_url +'">' +
        '</div>' +
        '<div class="col-md-5 insta-data">' +
          '<div class="insta-profile">' +
           '<img imageonload="imgloaded()" src="'+ info.owner.profile_pic_url +'">' +
            '<p>'+ info.owner.username +'</p>' +
            '<a class="btn btn-primary" href="https://www.instagram.com/p/'+ info.shortcode +'">visit</a>' +
          '</div>' +
          '<div class="insta-comments">' +
            comments +
          '</div>' +
          '<div class="insta-likes">' +
            '<p>'+ info.edge_media_preview_like.count +' likes</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    setTimeout(function(){
      $('.insta-data').height($('.insta-img').height());
    }, 1000);
  });
}