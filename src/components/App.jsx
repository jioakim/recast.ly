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

  // _.debounce(func, [wait=0], [options={}])

  // Arguments
  // func (Function): The function to debounce.
  // [wait=0] (number): The number of milliseconds to delay.
  // [options={}] (Object): The options object.
  // [options.leading=false] (boolean): Specify invoking on the leading edge of the timeout.
  // [options.maxWait] (number): The maximum time func is allowed to be delayed before it's invoked.
  // [options.trailing=true] (boolean): Specify invoking on the trailing edge of the timeout.


  // _.debounce()

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

  // create method for listening change of input field
    // call searchYouTube function
    // change options.query to search text state

  // App pass this method to Nav component & pass search text state
  // Nav pass this method to Search component
    // use onChange to listen for changes
    //

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
          {/* <Nav searchTextChange={_.debounce(this.searchTextChange.bind(this), 500)}/> */}
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
