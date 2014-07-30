$(document).ready(function(){
  // Set default username
  window.visitor = "anon";
  
  // set state for page. either "home" or a username.
  window.state = "home";
  
  // show all tweets when click on twittler logo;
  $("h1").click(function(){
    state = "home";
    displayTweets();
  });
  
  // capture tweets div
  var $tweets = $('.tweets');
          
  var postTweet = function() {
    if (visitor === "anon") {
      visitor = prompt("Whats your username?");
    }
    writeTweet(prompt("Enter your tweet!"));
  };

  // create new post when clicking .newTweet
  $(".newTweet").click(postTweet);
  
  // displays all users tweets in $tweets div
  var showUsersTweets = function () {
    state = $(this).attr("username");
    displayTweets();
  };
  
  var makeTweet = function (tweet) {
    var $tweet = $('<div class="tweet"><span class="username"></span><span class="time"></span><div class="msg"></div></div>');
    $tweet.children(".username").text('@' + tweet.user).attr("username", tweet.user).click(showUsersTweets);
    $tweet.children(".msg").text(tweet.message);
    $tweet.children(".time").text(moment(tweet.created_at).fromNow());
    return $tweet;
  };
  
  //displayTweets
  var displayTweets = function(){
    
    // set stream;
    var stream = state === "home" ? streams.home : streams.users[state];
    
    //clear page
    $tweets.html('');
    var index = stream.length - 1;
    while(index >= 0){
      var tweet = stream[index];
      var $madeTweet = makeTweet(tweet);
      // Newest tweets first.
      $madeTweet.appendTo($tweets);
      index -= 1;
    }
    
    // limit tweets to 25 newest tweets
    $(".tweet:gt(25)").remove();
  };
  
  // Init tweet display
  displayTweets();
  setInterval(displayTweets, 1000);
});
