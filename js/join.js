(function() { // :)


// Configure Vex
vex.defaultOptions.className = 'vex-theme-default';
vex.dialog.buttons.YES.text = 'Accept';
vex.dialog.buttons.NO.text = 'Decline';

// Show prompt
vex.dialog.confirm({
    message: "Before we the load the Tumblr form, we'd like to make sure you agree with their <a class='tumblr-privacy-policy' href='https://www.tumblr.com/policy/en/privacy' target='_blank'>privacy policy</a>.",
    callback: function (accept) {
        // If a visitor declines, we'll redirect them
        if (!accept) {
            window.location = './';
            return;
        }

        // Activate the iframe
        var $iframe = $('iframe');
        var url = $iframe.data('src');
        $iframe.attr('src', url);
    }
});



})(); // :)
