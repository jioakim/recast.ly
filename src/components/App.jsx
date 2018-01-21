class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentVideo: null,
      videoList: null,
    }
  }

  handleClick(obj){
    console.log(obj)
    this.setState({
      currentVideo: obj
    });
  }

  searchTextChange(event) {

    console.log(event.target.value);
    var options = {};
    options.key = window.YOUTUBE_API_KEY;
    options.query = event.target.value;
    options.max = 10;
    var results = [];
    var that = this;
    this.props.searchYouTube(options, function(data){
      results = data;

      that.setState({
        currentVideo: results[0],
        videoList: results
      });

    });

    // insideSearchTextChange();
  }

  componentDidMount(){
    // componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    // Setting state in this method will trigger a re-rendering.
    var options = {};
    options.key = window.YOUTUBE_API_KEY;
    options.query = 'cats';
    options.max = 10;
    var results = [];
    var that = this;
    this.props.searchYouTube(options, function(data){
      results = data;

      that.setState({
        currentVideo: results[0],
        videoList: results
      });

    });
  }

  render(){
    if(this.state.currentVideo === null){
      return(
        <div>
          <p>loading...</p>
        </div>
      );
    } else {
      return(
        <div>
          <Nav searchTextChange={_.debounce(this.searchTextChange.bind(this), 500)}/>
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoList} handleClick={this.handleClick.bind(this)}/>
          </div>
        </div>
      );
    }
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
