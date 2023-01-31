$(document).ready(function() {
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