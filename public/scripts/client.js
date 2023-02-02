$(document).ready(() => {
  
// Hide error message box and toTop button upon document rendering
  $("#error").hide();
  $("#toTop").hide();
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

// Error message animation
  const errorMessage = function(message) {
    $("#error").text(message);
    $("#error").slideDown(700);
  }

// Template for creating a new tweet
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
            <i id="react" class="fa-solid fa-flag"></i>
            <i id="react" class="fa-solid fa-retweet"></i>
            <i id="react" class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `)
    return $tweet;
  }

// Loop through tweet database
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      const $createdTweet = createTweetElement(tweet);
      $('#tweets-container').prepend($createdTweet); 
    }
  }

// Load tweets from database
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      dataType: "json",
      success: function(data) {
        renderTweets(data);
      }
    });
  }
  loadTweets();

// Submit new tweet and reload tweet database, starting from newest tweet
  $("form").submit(function(event) {
    event.preventDefault();
    if ($('textarea').val().trim() === "") {
      return errorMessage("Cannot post a blank tweet");
    } else  if ($('textarea').val().length > 140) {
      return errorMessage("Your tweet is too long");
    } else {
      $("#error").slideUp(300);
      $.post("/tweets/", $(this).serialize())
      .then(() => {
        loadTweets();
        $("textarea").val("");
        $(".counter").text(140);
    });
  }});

// Toggle new tweet textarea
  $("#arrow-button").click(function() {
    $("form").slideToggle(800);
    $("textarea").focus();
  });

// Scroll-to-top button functionality
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $("#toTop").show();
    }
    if ($(this).scrollTop() < 200) {
      $("#toTop").hide();
    }
  });
  $("#toTop").click(function() {
    $(window).scrollTop(0);
    $("#toTop").hide();
  });
});