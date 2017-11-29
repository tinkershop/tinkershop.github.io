jsonReadAll();
$('#cFeedback').click(function() {
  jsonReadFeedback();
});

$('#nextAll').click(function() {
  nextAlltab();
});
$('#nextFeedback').click(function() {
  nextFeedbacktab();
});

var items = [];
var feeditems = [];
var allcount = 0;
var feedbackcount = 0;
function jsonReadAll() {
  var url = 'https://tinkershop.github.io/data/allwithoutfeedback.json';
  $.getJSON(url, function( data ) {
    var count1 = -1;
    var count2 = 0;
    $.each( data, function( key, val ) {
      $.each( val, function( key1, val1 ) {
        if (count2 == 0 || count2 % 9 == 0) {
          items[++count1] = [];
        }
        items[count1][count2] =
          '<div class="col-sm-6 col-md-4">' +
            '<div class="panel panel-default">' +
              '<div class="panel-heading"></div>' +
                '<div onclick="instagramData(\'https://www.instagram.com/p/'+ val1.shortcode +'\')" class="panel-body panel-instagram">' +
                  '<img src="' + val1.media_url + '" style="width: 100%;"></img>' +
                '</div>' +
              '<div class="panel-footer"></div>' +
            '</div>' +
          '</div>';
        count2++;
      });
    });
    $( "<div/>", {
      "class": "list",
      html: items[0].join( "" )
    }).prependTo( "#allTab" );

    // var monkeyList = new List('allTab', {
    //   page: 9,
    //   pagination: true
    // });
  });
}

function nextAlltab() {
  allcount++;
  $('.list').append(items[allcount]);
  if (items.length <= allcount+1) {
    document.getElementById('nextAll').outerHTML = '';
  }
}

function jsonReadFeedback() {
  var url = 'https://tinkershop.github.io/data/feedback.json';
  $.getJSON(url, function( data ) {
    var count1 = -1;
    var count2 = 0;
    $.each( data, function( key, val ) {
      $.each( val, function( key1, val1 ) {
        if (count2 == 0 || count2 % 9 == 0) {
          feeditems[++count1] = [];
        }
        feeditems[count1][count2] =
          '<div class="col-sm-6 col-md-4">' +
            '<div class="panel panel-default">' +
              '<div class="panel-heading"></div>' +
                '<div onclick="instagramData(\'https://www.instagram.com/p/'+ val1.shortcode +'\')" class="panel-body panel-instagram">' +
                  '<img src="' + val1.media_url + '" style="width: 100%;"></img>' +
                '</div>' +
              '<div class="panel-footer"></div>' +
            '</div>' +
          '</div>';
        count2++;
      });
    });
    $( "<div/>", {
      "class": "feedBackList",
      html: feeditems[0].join( "" )
    }).prependTo( "#feedbackTab" );

    // var monkeyList = new List('feedbackTab', {
    //   page: 9,
    //   pagination: true
    // });
  });
  $('#cFeedback').unbind( "click" );
}

function nextFeedbacktab() {
  feedbackcount++;
  $('.feedBackList').append(feeditems[feedbackcount]);
  if (feeditems.length <= feedbackcount+1) {
    document.getElementById('nextFeedback').outerHTML = '';
  }
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