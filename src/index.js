// TODO: Render the `App` component to the DOM

// searchYouTube(options, function(data){
//   results = data.items;
//   console.log(results);
// });

ReactDOM.render(<App searchYouTube={searchYouTube}/>, document.getElementById('app'));

