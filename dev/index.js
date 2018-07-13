// Needs to be imported for webpack to compile SCSS files
import '../scss/style.scss';

(function() {

  const access_token = '43954a59ad6ddce58c59c0580d76717055182bb87bc08c50511aac86122dee54';

  // STORE DATA FROM AJAX REQUEST
  const store = {
    teams: null,
    playoffs: null,
    debuts: null,
    animated: null,
    rebounds: null
  }



  const dribbbleApp = {
    // START THE APP
    init: function() {
      this.currentPage = 'teams';

      // FIND ELEMENTS ON HTML PAGE
      this.$cards = $('#cards');
      this.$teams = $('#teams');
      this.$playoffs = $('#playoffs');
      this.$debuts = $('#debuts');
      this.$animated = $('#animated');
      this.$rebounds = $('#rebounds');
      this.$nav = $('#nav');
      this.$navLinks = $('#nav a');
      this.$viewer = $('#viewer');
      this.$viewerContentContainer = $('#viewer-content-container');
      this.$viewerImageContentContainer = $('#viewer-image-content-container');
      this.$closeViewer = $('#viewer-close-button');
      this.$imageContainer = $('#viewer-image-container');
      this.$imageDescription = $('#viewer-image-des-container');

      // POPULATE MAIN PAGE WITH DEFAULT PHOTOS
      this.getData('playoffs');

      // ACTIVATE NAVIGATION TABS
      this.switchTab();

      // Activate Viewer
      this.initViewer();
    },



    // CLICK EVENTS FOR NAVIGATION TABS
    switchTab: function() {
      const that = this;

      this.$nav.on('click', 'a', function() {
        // FETCH ID OF THE CLICKED LINK
        const id = $(this).attr('id');

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
        url: 'https://api.dribbble.com/v2/user/shots',
        data: {
          access_token: access_token,
          list: shotType
        },
        dataType: 'json'
      })
      // TAKE DATA AND STORE IN store{}
      .done(function(response) {

        // .data ACCESSES THE DATA OBJECT - CONSOLE.LOG FOR CLARITY
        // Using bracket notation to access key in the store object to store response data
        store[shotType] = response.data;
        console.log(response);
        // USE DATA AND CREATE CARDS
        this.createCards(shotType);
      }.bind(this));
    },



    // GET DATA FROM DRIBBBLE AND INSERT INTO CARD TEMPLATE
    createCards: function(shotType) {

      this.$cards.empty();
      const shots = store[shotType];

      // GRAB SPECIFIC DATA FROM store{} FOR EACH SHOT
      if (shots.length) {   // check to see if array has items in it
        for (var i = 0; i < shots.length; i++) {
          this.createImageCard(shots[i], shotType);
        }
      } else {
        return 'Sorry, no images are available.'
      }
    },



    createImageCard: function(image, shotType) {
      // GET SPECIFIC DATA from store{} FOR EACH SHOT AND INSERT INTO CARD TEMPLATE
      const card =
      `
        <figure class="card">
          <img src="${image.images.normal}" alt="${image.title}" data-type="${shotType}" id="${image.id}"/>
          <figcaption>
              <ul>
                <li><span>${image.views_count}</span>views</li>
                <li><span>${image.likes_count}</span>likes</li>
                <li><span>${image.comments_count}</span>comments</li>
              </ul>
          </figcaption>
        </figure>
     `

      // TAKE HTML CARD TEMPLATE AND INSERT INTO PAGE
      this.$cards.append(card);
    },



    // CREATE VIEWER IMAGE CARD
    createViewerCard: function(element) {
      const shotType = element.find('img')[0].dataset.type;
      const shotID = element.find('img')[0].id;
      // Based on clicked image, search Data Store and find exact image using shot type and ID of image
      const data = _.find(store[shotType], {id: parseInt(shotID, 10)});
      const tags = data.tags;
      console.log(tags);

      console.log(data);

      // If description is a falsy/null, convert to empty string
      const imageDescription = data.description || '';

      this.$viewerImageContentContainer.empty();

      // Viewer card template
      const createViewerImageCardHTMLTemplate =
      `
        <div id="viewer-image-container" class="viewer-image-container">
          <img src="${data.images.hidpi}"/>
          <div class="tags-title">Tags:</div>
          <ul id="tags" class="tags">
          </ul>
        </div>
        <div id="viewer-image-des-container" class="viewer-image-des-container">
          <h2>${data.title}</h2>
          <div class="image-author">by <a href="${data.user.html_url}" target="_blank">${data.user.name}</a></div>
          <div class="image-description">${imageDescription}</div>
          <ul>
            <li><i class="fa fa-heart" aria-hidden="true"></i><span>${data.likes_count}</span>likes</li>
            <li><i class="fa fa-eye" aria-hidden="true"></i><span>${data.views_count}</span>views</li>
            <li><i class="fa fa-bitbucket" aria-hidden="true"></i><span>${data.buckets_count}</span>buckets</li>
          </ul>
        </div>
      `

      // Insert viewer card template into HTML
      this.$viewerImageContentContainer.append(createViewerImageCardHTMLTemplate);

      // Loop thru tags array and insert each tag into separate <li>
      const createTagList = tags.map((tag) => { return `<li>${tag}</li>`; })
      $('#tags').append(createTagList);

      // Animate viewer to slide in from left
      this.$viewer.fadeIn();
      this.$viewerContentContainer.removeClass('slideOutLeft').addClass('animated slideInLeft');
    },



    // IMAGE VIEWER
    initViewer: function() {
      const that = this;

      // OPEN VIEWER
      this.$cards.on('click', '.card', function(event) {
        event.preventDefault();
        that.createViewerCard($(this));
      });

      // CLOSER VIEWER

      // Close viewer upon click on exit icon
      this.$closeViewer.on('click', function(event) {
        event.stopPropagation();
        that.$viewerContentContainer.removeClass('slideInLeft').addClass('slideOutLeft');
        that.$viewer.fadeOut();
      })

      // Disable closing of viewer upon click on image content container
      this.$viewerContentContainer.on('click', function(event) {
        event.stopPropagation();
      })

      // Close viewer upon click anywhere outside of image content container
      this.$viewer.on('click', function() {
        that.$viewerContentContainer.removeClass('slideInLeft').addClass('slideOutLeft');
        $(this).fadeOut();
      })
    }
  }

  // RUN THE APP
  dribbbleApp.init();

})();
