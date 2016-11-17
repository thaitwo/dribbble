var dribbbleApp = {
  $cards: null,

  // START THE APP
  init: function() {
    // FIND ELEMENTS ON HTML PAGE
    this.$cards = $('#cards');
    this.$teams = $('#teams');
    this.$playoffs = $('#playoffs');
    this.$debuts = $('#debuts');

    // FIND THE HTML FOR CARD TEMPLATE
    // CREATE A TEMPLATE TO USER LATER, IN THIS CASE A CARD
    this.$templateCardHTML = $('#template_card').html();
    this.createCard = _.template(this.$templateCardHTML);

    // POPULATE MAIN PAGE WITH DEFAULT PHOTOS
    this.getData('teams');

    // ACTIVATE MENU TABS
    this.switchTab();
  },



  // CLICK EVENTS FOR NAVIGATION TABS
  switchTab: function() {
    var that = this;

    this.$playoffs.click(function() {
      that.$cards.empty();
      that.$cards.html(that.getData('playoffs'));
      that.$teams.removeClass('selected');
      that.$debuts.removeClass('selected');
      $(this).addClass('selected');
    })

    this.$debuts.click(function() {
      that.$cards.empty();
      that.$cards.html(that.getData('debuts'));
      that.$teams.removeClass('selected');
      that.$playoffs.removeClass('selected');
      $(this).addClass('selected');
    })

    this.$teams.click(function() {
      that.$cards.empty();
      that.$cards.html(that.getData('teams'));
      that.$debuts.removeClass('selected');
      that.$playoffs.removeClass('selected');
      $(this).addClass('selected');
    })
  },



  // REQUEST DATA FROM DRIBBBLE
  getData: function(list) {
    $.ajax({
      url: 'https://api.dribbble.com/v1/shots',
      data: {
        access_token: CONFIG.access_token,
        list: list
      },
      dataType: 'jsonp'
    })
    // USE DATA AND CREATE CARDS
    .done(this.createCards.bind(this));
  },



  // GET DATA FROM DRIBBBLE AND INSERT INTO CARD TEMPLATE
  createCards: function(response) {
    var shots = response.data;

    // GRAB SPECIFIC DATA FOR EACH SHOT
    for (var i = 0; i < shots.length; i++) {
      var imageUrl = shots[i].images.teaser;
      var title = shots[i].title;
      var likesCount = shots[i].likes_count;
      var commentCounts = shots[i].comments_count;

      // GET SPECIFIC DATA FOR EACH SHOT
      var card = this.createCard({
        image_teaser_url: imageUrl,
        title: title,
        likes_count: likesCount,
        comments_count: commentCounts
      })

      // TAKE HTML CARD TEMPLATE AND INSERT INTO PAGE
      this.$cards.append(card);
    }
  }
}

dribbbleApp.init();
