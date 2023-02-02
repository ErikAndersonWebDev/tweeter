$(document).ready(function() {
// Tweet character counter - default 140 - black-color when above 0, red-color when below 0
  $('textarea').keyup(function(){
    const charCount = $(this).val().length;
    const counter = $(this).parent().children().children('.counter');
    counter.text(140 - charCount);
    if (charCount > 140) {
      counter.addClass('negative')
    } else {
      counter.removeClass('negative')
    }
  })
});