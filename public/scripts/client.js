$(document).ready(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const createTweetElement = function(obj) {
    const name = obj.user.name;
    const handle = obj.user.handle;
    const text = obj.content.text;
    const dateCreated = timeago.format(obj.created_at);
    const $tweet = $(`
      <article class="tweet">
        <header class="tweet">
          <div class="pro-details">
            <img src="/images/profile-hex.png">
            <p>${name}</p>
          </div>
          <p>${handle}</p>
        </header>
        <div class="posted-tweet">
          ${escape(text)}
        </div>
        <footer class="tweet">
          Posted ${dateCreated}
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `)
    return $tweet;
  }
  
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      const $createdTweet = createTweetElement(tweet);
      $('#tweets-container').prepend($createdTweet); 
    }
  }

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      dataType: "json",
      success: function(data) {
        renderTweets(data)
      }
    });
  }

  loadTweets();

  $("form").submit(function(event) {
    event.preventDefault();
    if ($('textarea').val().trim() === "") {
      return alert("Cannot submit an empty tweet")
    } else  if ($('textarea').val().length > 140) {
      return alert("Your tweet is too long")
    } else {
    $.post("/tweets/", $(this).serialize())
    .then(() => {
      loadTweets();
      $('textarea').val("");
      $('.counter').text(140);
    });
  }});

  $("#arrow-button").click(function() {
    $("form").slideToggle(800)
  })

});