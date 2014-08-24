/*!
* @license Copyright 2014 Chris Antaki. MIT License: http://en.wikipedia.org/wiki/MIT_License
*/

;(function ($) {
    var templates = {};

    function jQueryDotTemplate (target, values) {
        if (!templates[target]) {
            templates[target] = $(target).html();
        }

        var $html = $('<div>' + templates[target] + '</div>');

        for (var i in values) {
            $html.find('.class-' + i).addClass(values[i]);
            $html.find('.href-' + i).attr('href', values[i]);
            $html.find('.src-' + i).attr('src', values[i]);
            $html.find('.target-' + i).attr('target', values[i]);
            $html.find('.text-' + i).text(values[i]);
        }

        return $html.children();
    }

    $.template = jQueryDotTemplate;
})(jQuery);
