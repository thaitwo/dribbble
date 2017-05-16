(function() {

  const access_token = 'b0b86bea665b3d2224f6801878471ab2897740bc4eb69f5105027c87fc114908';

  // STORE DATA FROM AJAX REQUEST
  var store = {
    teams: null,
    playoffs: null,
    debuts: null,
    animated: null,
    rebounds: null
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
      this.$animated = $('#animated');
      this.$rebounds = $('#rebounds');
      this.$nav = $('#nav');
      this.$navLinks = $('#nav a');

      // FIND THE HTML FOR CARD TEMPLATE
      // CREATE A CARD TEMPLATE (WITH UNDERSCORE.JS) TO USE LATER
      this.$templateCardHTML = $('#template_card').html();
      this.createCard = _.template(this.$templateCardHTML);

      // POPULATE MAIN PAGE WITH DEFAULT PHOTOS
      this.getData('teams');

      // ACTIVATE NAVIGATION TABS
      this.switchTab();
    },



    // CLICK EVENTS FOR NAVIGATION TABS
    switchTab: function() {
      var that = this;

      this.$nav.on('click', 'a', function() {
        // FETCH ID OF THE CLICKED LINK
        var id = $(this).attr('id');

        // CLEAR SELECTED CLASS AND INSERT IT INTO CLICKED LINK
        that.$navLinks.removeClass('selected');
        $(this).addClass('selected');

        that.$cards.empty();

        // IF STORED DATA IS AVAILABLE, SKIP getData() AND JUMP TO createCards()
        if (store[id]) {
          that.createCards(id);
        }
        // IF THERE IS NO STORED DATA, REQUEST DATA
        else {
          that.getData(id);
        }
      })
    },


    /**
    * GET DATA FROM DRIBBBLE METHOD
    *
    * @function
    * @param {String} shotType - The type of shots you want to get from Dribbble (eg. 'teams', 'playoffs', etc.)
    * @returns {Array} - Returns a list of shots for that shotType
    * @description - For full list of shots, visit http://developer.dribbble.com/v1/shots/#list-shots
    */

    getData: function(shotType) {
      $.ajax({
        url: 'https://api.dribbble.com/v1/shots',
        data: {
          access_token: access_token,
          list: shotType
        },
        dataType: 'jsonp'
      })
      // TAKE DATA AND STORE IN store{}
      .done(function(response) {
        // .data ACCESSES THE DATA OBJECT - CONSOLE.LOG FOR CLARITY
        // Using bracket notation to access key in the store object to store response data
        store[shotType] = response.data;

        // USE DATA AND CREATE CARDS
        this.createCards(shotType);
      }.bind(this));
    },



    // GET DATA FROM DRIBBBLE AND INSERT INTO CARD TEMPLATE
    createCards: function(shotType) {

      this.$cards.empty();
      var shots = store[shotType];

      // GRAB SPECIFIC DATA FROM store{} FOR EACH SHOT
      for (var i = 0; i < shots.length; i++) {
        this.createImageCard(shots[i]);
      }
    },



    createImageCard: function(image) {
      // GET SPECIFIC DATA from store{} FOR EACH SHOT AND INSERT INTO CARD TEMPLATE
      var card = this.createCard({
        image_url: image.images.normal,
        title: image.title,
        views_count: image.views_count,
        likes_count: image.likes_count,
        comments_count: image.comments_count
      })

      // TAKE HTML CARD TEMPLATE AND INSERT INTO PAGE
      this.$cards.append(card);
    }


    // ACTIVATE IMAGE VIEWER
  }

  // RUN THE APP
  dribbbleApp.init();

})();
