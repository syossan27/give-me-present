$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "/getItem",
    success: function(item) {
      $('#present-link').attr('href', item.DetailPageURL[0])
      $('#present-str-link').attr('href', item.DetailPageURL[0])
      $('.present-block h2').text(item.ItemAttributes[0].Title)
      $('#present').attr('src', "http://images.amazon.com/images/P/" + item.ASIN[0] + ".01_SL110_.jpg")
    },
    error: function(msg) {
      $('div.alert').attr('class', 'alert alert-danger')
      $('div.alert').text('すまないがもう一度試しておくれ')
    }
  });
});
