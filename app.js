// FIND ELEMENTS ON HTML PAGE
var $cards = $('#cards');
var $teams = $('#teams');
var $playoffs = $('#playoffs');
var $debuts = $('#debuts');

// FIND THE HTML FOR CARD TEMPLATE
// CREATE A TEMPLATE TO USER LATER, IN THIS CASE A CARD
var $templateCardHTML = $('#template_card').html();
var createCard = _.template($templateCardHTML);


// REQUEST DATA FROM DRIBBBLE
function getData(list) {
  $.ajax({
    url: 'https://api.dribbble.com/v1/shots',
    data: {
      access_token: 'b0b86bea665b3d2224f6801878471ab2897740bc4eb69f5105027c87fc114908',
      list: list
    },
    dataType: 'jsonp'
  })
  // USE DATA AND CREATE CARDS
  .done(createCards);
}

// GRAB DATA FROM DRIBBBLE AND INSERT INTO CARD TEMPLATE
function createCards(response) {
  var shots = response.data;

  // GRAB SPECIFIC DATA FOR EACH SHOT
  for (var i = 0; i < shots.length; i++) {
    var imageUrl = shots[i].images.teaser;
    var title = shots[i].title;
    var likesCount = shots[i].likes_count;
    var commentCounts = shots[i].comments_count;

    // TAKE DATA AND INSERT CARD TEMPLATE
    var card = createCard({
      image_teaser_url: imageUrl,
      title: title,
      likes_count: likesCount,
      comments_count: commentCounts
    })

    // TAKE HTML CARD TEMPLATE AND INSERT INTO PAGE
    $cards.append(card);
  }
}


// CLICK EVENTS FOR NAVIGATION ITEMS
$playoffs.click(function() {
  $cards.empty();
  $cards.html(getData('playoffs'));
})

$debuts.click(function() {
  $cards.empty();
  $cards.html(getData('debuts'));
})

$teams.click(function() {
  $cards.empty();
  $cards.html(getData('teams'));
})

// POPULATE MAIN PAGE WITH DEFAULT PHOTOS
getData('teams');


