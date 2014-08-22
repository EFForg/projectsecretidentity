// OWL Carousel
$('.slider')
    .owlCarousel({
        autoPlay: 3000,
        pagination: false,
        singleItem: true,
        transitionStyle: 'goDown'
    })
    .removeClass('loading');

// Isotope
var $isotope = $(".isotope");
var size = $isotope.data('image-size');

$.getJSON("data/posts.json", function (posts) {
    var $wrapper = $("<div>");

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        // Show featured images
        if (!post.tags || post.tags.indexOf('featured') == -1) {
            continue;
        }

        var $el = renderPost(post, size);

        $wrapper.append($el);
    }

    $isotope
        .empty()
        .append($wrapper.children())
        .isotope({
            itemSelector : ".photo",
            masonry : {
                columnWidth : 320,
                isFitWidth  : true
            }
        });
});

function renderPost (post, size) {
    var photo = post.url500;
    if (size === 'xl') {
        photo = post.url1280;
    }

    var $el = $.template("#template-photo", {
        "caption" : post.blurb,
        "image"   : photo
    });

    if (!post.blurb) {
        $el.find("p").remove();
    }

    var height = (post.height / post.width) * 300;
    $el.find("img").height(height);

    return $el;
}

// Vex
var hasViewedPrivacyPolicy = false;
vex.defaultOptions.className = 'vex-theme-flat-attack';
$('#join').on('click', function(e) {
    e.preventDefault();

    var joinUrl = this.href;

    if (!hasViewedPrivacyPolicy) {
        vex.dialog.confirm({
            message: "To view the form, you'll need to read Tumblr's <a class='tumblr-privacy-policy' href='http://projectsecretidentity.tumblr.com/terms_of_submission' target='_blank'>terms of submission</a>. (Note: We've read it and given it the thumbs up)",
            callback: function(accepted) {
                if (accepted) {
                    if (hasViewedPrivacyPolicy) {
                        window.location = joinUrl;
                    } else {
                        vex.dialog.alert("Please read the <a class='tumblr-privacy-policy' href='http://projectsecretidentity.tumblr.com/terms_of_submission' target='_blank'>terms of submission</a> before proceeding.");

                        listenForPrivacyPolicyClick();
                    }
                }
            }
        });
    } else {
        window.location = joinUrl;
    }

    listenForPrivacyPolicyClick();
});

function listenForPrivacyPolicyClick(url) {
    $('.tumblr-privacy-policy').off().on('click', function (e) {
        hasViewedPrivacyPolicy = true;
    });
}
