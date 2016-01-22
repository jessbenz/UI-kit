jQuery(document).ready(function($) {
  var tags = $('#tags').inputTags({
    init: function(elem) {
      $('span', '#events').text('init');
      $('<p class="results">').html('<strong>Tags:</strong> ' + elem.tags.join(' - ')).insertAfter(elem.$list);
    },
    create: function() {
      $('span', '#events').text('create');
    },
    update: function() {
      $('span', '#events').text('update');
    },
    destroy: function() {
      $('span', '#events').text('destroy');
    },
    selected: function() {
      $('span', '#events').text('selected');
    },
    unselected: function() {
      $('span', '#events').text('unselected');
    },
    change: function(elem) {
      $('.results').empty().html('<strong>Tags:</strong> ' + elem.tags.join(' - '));
    },
    autocompleteTagSelect: function(elem) {
      console.info('autocompleteTagSelect');
    }
  });

  var autocomplete = $('#tags').inputTags('options', 'autocomplete');
  $('span', '#autocomplete').text(autocomplete.values.join(', '));
});