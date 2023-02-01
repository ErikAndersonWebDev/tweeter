$(document).ready(() => {

  const data = [
   {
     "user": {
       "name": "Newton",
       "avatars": "https://i.imgur.com/73hZDYK.png",
       "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
      "created_at": 1461113959088
      }
    ]
    
    
    const createTweetElement = function(obj) {
      const name = obj.user.name;
      const handle = obj.user.handle;
      const text = obj.content.text;
      const dateCreated = obj.created_at;
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
      for (let tw of tweets) {
        const $createdTweet = createTweetElement(tw);
        $('#tweets-container').append($createdTweet); 
      }
    }
    
    renderTweets(data);
    
  });