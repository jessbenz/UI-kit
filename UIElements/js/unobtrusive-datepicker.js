(function() {
    var zeroPadLeft = function(num, places) {
        if (places === undefined || places < 0) {
            places = 2;
        }
        num = num + "";
        while (num.length < places) {
            num = "0" + num;
        }
        return num;
    };
    var transformIntoDatePicker = function (el) {
        var range = parseInt(el.attr('data-datepicker-year-range'));
        range = isNaN(range) ? 10 : range;
        var rangeStr = 'c-' + range + ':c+' + range;
        if (el.hasClass("monthpicker")) {
            var customCloseFunctionForMonthPicker = function() {
                var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                el.val($.datepicker.formatDate('yy/mm/dd', new Date(year, month, 1)));
                el.trigger("change");
            };
            el.datepicker({
                dateFormat: "yy/mm/dd",
                yearRange: rangeStr,
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                onClose: customCloseFunctionForMonthPicker
            });

            el.focus(function() {
                $(".ui-datepicker-calendar").hide();
                $(".ui-datepicker-current").text("This month");
                $("#ui-datepicker-div").position({
                    my: "center top",
                    at: "center bottom",
                    of: el
                });
            });
        } else {
            var customCloseFunction = function() {
                if (el.attr("data-date-granularity") == "month") {
                    var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    el.datepicker("setDate", new Date(year, month, 1));
                    el.trigger("change");
                }
            };
            el.datepicker({
                yearRange: rangeStr,
                dateFormat: "yy/mm/dd",
                changeMonth: true,
                changeYear: true,
                onClose: customCloseFunction
            });
        }
        el.val(el.val().replace(/-/g, "/").split(' ')[0]); // hack around date format culture; extra hack to take date only
        el.attr("type", "text"); // make everyone just use the regular jqueryUI datepicker
        el.css("cursor", "pointer"); // FIXME: should be set in site.css
        el.on("focus", function() {
            el.blur();
        });
        var currentVal = el.val();
        if (currentVal.length) {
            try {
                var dateVal = new Date(currentVal);
                if (!isNaN(dateVal.getDate())) {
                    $(this).val([dateVal.getFullYear(), zeroPadLeft(dateVal.getMonth() + 1), zeroPadLeft(dateVal.getDate())].join("/"));
                }
            } catch (e) {
            }
        }
        var img = $("<div></div>");
        img.addClass("clear-date");
        img.insertAfter(el);
        img.on("click", function() {
            el.val("");
        });
    }

    $("[data-val-date], .datepicker").livequery(function () {
        var el = $(this);
        if (el.attr('type') === 'date') {
            return;
        }
        transformIntoDatePicker(el);
            
        el.nextAll('.glyphicon').on('click', function () {
            el.datepicker('show');
        });
    });
})();