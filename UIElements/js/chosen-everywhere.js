
var ElementTracker = function () {
    this._elements = [];
};
ElementTracker.prototype = {
    isTracked: function (jqueryObject) {
        if (jqueryObject.length < 1) {
            return true;
        }
        var innerElement = $(jqueryObject).get(0);
        if (this._elements.indexOf(innerElement) > -1) {
            return true;
        }
        this._elements.push(innerElement);
        return false;
    }
};

var noChosenAttrib = 'data-no-chosen';
var tracker = new ElementTracker();

var noChosenFor = function(el) {
    if (tracker.isTracked(el)) {
        return true;
    }
    var noChosen = el.attr(noChosenAttrib) || '';
    if (noChosen.toLowerCase() === 'true') {
        return true;
    }
    return (el.attr('multiple') === 'multiple');
};
var inDatePicker = function(el) {
    var container = el.closest('.ui-datepicker');
    return container.length > 0;
}
var hideFilterFor = function (el) {
    var maxItems = inDatePicker(el) ? 20 : 5;
    var options = el.find('option');
    return options.length <= maxItems;
}
$('select').livequery(function () {
    var el = $(this);
    el.css('visibility', 'hidden');
    window.setTimeout(function() {
        if (noChosenFor(el)) {
            el.addClass('form-control');
            return;
        }
        el.chosen({ disable_search: hideFilterFor(el) });
        el.css('visibility', 'inherit');
    }, 250);
});
