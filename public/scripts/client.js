$(document).ready(() => {
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
          ${text}
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

    $.post("/tweets/", $(this).serialize())
    .then((response) => {
      loadTweets();
      $(this).children('textarea').val("");
      $('.counter').text(140);
    });
  });

  
});