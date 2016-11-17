(function() {

  var dropDown = {
    button: null,
    dropdown: null,
    open: true,

    start: function() {
      this.button = $('.dropdown-button');
      this.dropdown = $('.dropdown-menu');

      this.activateMenu();
    },

    activateMenu: function() {
      var that = this;

      this.button.on('click', function(e) {
        e.preventDefault();

        if(that.open) {
          that.closeMenu();
        }
        else {
          that.openMenu();
        }
      });
    },

    openMenu: function() {
      this.dropdown.show();
      this.open = true;
    },

    closeMenu: function() {
      this.dropdown.hide();
      this.open = false;
    }
  };

  // START THE APP
  dropDown.start();

})();

