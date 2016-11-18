(function() {

  var store = {
    teams: null,
    playoffs: null,
    debuts: null
  }


  var dribbbleApp = {
    $cards: null,

    // START THE APP
    init: function() {
      // FIND ELEMENTS ON HTML PAGE
      this.$cards = $('#cards');
      this.$teams = $('#teams');
      this.$playoffs = $('#playoffs');
      this.$debuts = $('#debuts');
      this.$nav = $('#nav');
      this.$navLinks = $('#nav a');

      // FIND THE HTML FOR CARD TEMPLATE
      // CREATE A TEMPLATE (WITH UNDERSCORE.JS) TO USE LATER, IN THIS CASE A CARD
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

      this.$nav.on('click', 'a', function() {
        // FETCH ID OF THE CLICKED LINK AND GIVE TO getData() FUNCTION
        var id = $(this).attr('id');

        that.$cards.empty();

        // IF STORED DATA IS AVAILABLE, SKIP getData() AND JUMP TO createCards()
        if (store[id]) {
          that.createCards(id);
        }
        // IF THERE IS NO STORED DATA, REQUEST DATA WITH getData()
        else {
          that.getData(id);
        }

        // CLEAR SELECTED CLASS AND INSERT IT INTO CLICKED LINK
        that.$navLinks.removeClass('selected');
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
      // TAKE DATA AND STORE IN store{} OBJECT
      .done(function(response) {
        store[list] = response.data;

        // USE DATA AND CREATE CARDS
        this.createCards(list);
      }.bind(this));
    },



    // GET DATA FROM DRIBBBLE AND INSERT INTO CARD TEMPLATE
    createCards: function(list) {
      // .data ACCESSES THE DATA OBJECT - CONSOLE.LOG FOR CLARITY
      this.$cards.empty
      var shots = store[list];

      // GRAB SPECIFIC DATA FOR EACH SHOT
      for (var i = 0; i < shots.length; i++) {
        this.createImageCard(shots[i]);
      }
    },



    createImageCard: function(image) {
      // GET SPECIFIC DATA FOR EACH SHOT
      var card = this.createCard({
        image_teaser_url: image.images.teaser,
        title: image.title,
        likes_count: image.likes_count,
        comments_count: image.comments_count
      })

      // TAKE HTML CARD TEMPLATE AND INSERT INTO PAGE
      this.$cards.append(card);
    }
  }

  dribbbleApp.init();

})();
