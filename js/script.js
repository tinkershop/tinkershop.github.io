window.fbAsyncInit = function() {
  FB.init({
    appId            : '1760730183939339',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.11'
  });

  FB.api(
    '/17841400971875220/media',
    'GET',
    {"fields":"media_url,shortcode,caption", "access_token":"EAAZABXZCEotQsBAGDQsfTv9TCjhgPIJlJTSWLujgdU7jvnWq5mPyBPsxeDSjZB9jtCPfOzxQelFJsW5ttaoULDSjOocptDn4CanOwm7JveP2t1FAecFYeSwu0ZCXDCUE09CQAU9lUpYRRZBPrP6SxWM60xt8T4TLTeVkFYhRNeQZDZD"},
    function(response) {
        console.log(response);
        jsonWrite();
    }
  );
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function jsonWrite() {
  var obj = {
     table: []
  };

  obj.table.push({id: 1, square:2});
  var json = JSON.stringify(obj);
  var url = './data/instagram.json';

  $.getJSON(url, function( data ) {
    console.log(data);
    var items = [];
    $.each( data, function( key, val ) {
      items.push( "<li id='" + key + "'>" + val + "</li>" );
    });
   
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "body" );
  });
}
