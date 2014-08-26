var $iframe = $('iframe');
vex.dialog.buttons.YES.text = 'Accept';
vex.dialog.buttons.NO.text = 'Decline';

// Vex
var hasViewedPrivacyPolicy = false;
vex.defaultOptions.className = 'vex-theme-default';

vex.dialog.confirm({
    message: "Before we the load the Tumblr form, we'd like to make sure you agree with their <a class='tumblr-privacy-policy' href='https://www.tumblr.com/policy/en/privacy' target='_blank'>privacy policy</a>.",
    callback: function(accepted) {
        if (accepted) {
            var url = $iframe.data('src');
            $iframe.attr('src', url);
        } else {
            window.location = './';
        }
    }
});
