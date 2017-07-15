var searchYouTube = (options, callback) => {
  // https://www.googleapis.com/youtube/v3/search
  // https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAqQBznqJ7gKW3CQ2SIzuPy_f1b57TD3Sg&q=cats&maxResults=10
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    dataType: 'JSON',
    data: {
      part: 'snippet',
      key: options.key,
      q: options.query,
      maxResults: options.max,
      // videoEmbeddable: true
    },
    success: function(data){
      console.info('success 👍', data.responseText);
      // callback(data);
    },
    error: function(data){
      console.error('failed 😭', data.responseText);
    }
  }).done(function(data){
    callback(data.items);
  })
};

// When the Deferred is resolved, the doneCallbacks are called. Callbacks are executed in the order they were added. Since deferred.done() returns the deferred object, other methods of the deferred object can be chained to this one, including additional .done() methods. When the Deferred is resolved, doneCallbacks are executed using the arguments provided to the resolve or resolveWith method call in the order they were added. For more information, see the documentation for Deferred object.

// deferred.done( doneCallbacks [, doneCallbacks ] )

// .done(function() {
//   alert( "$.get succeeded" );
// });

window.searchYouTube = searchYouTube;


// window.searchYouTube({ part: 'snippet', key: 'AIzaSyAqQBznqJ7gKW3CQ2SIzuPy_f1b57TD3Sg', q: 'cats', maxResults: 10 });