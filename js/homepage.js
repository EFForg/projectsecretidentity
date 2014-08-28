(function() { // :)


// Configure Vex modals
vex.defaultOptions.className = 'vex-theme-default';
vex.dialog.buttons.YES.text = 'Close';


$.getJSON("data/posts.json", function (photos) {
    // Temporary photo storage units
    var $photosForIsotope = $("<div>");
    var $photosForOwl = $("<div>");

    // Filter & render photos
    for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];

        if (photo.tags) {
            if (photo.tags.indexOf('topsecret') !== -1) {
                $photosForOwl.append(renderSimplePhoto(photo));
            }

            if (photo.tags.indexOf('featured') !== -1) {
                $photosForIsotope.append(renderPhoto(photo));
            }
        }
    }

    // Set up Owl slider
    $(".slider")
        .append($photosForOwl.children())
        .owlCarousel({
            autoPlay: 3000,
            pagination: false,
            singleItem: true,
            transitionStyle: 'goDown'
        })
        .removeClass('loading');

    // Set up Isotope
    $('.isotope')
        .empty()
        .append($photosForIsotope.children())
        .isotope({
            itemSelector : ".photo",
            masonry : {
                columnWidth : 320,
                isFitWidth  : true
            },
            transitionDuration: 0
        })
        .find('.fresh').removeClass('fresh');

    // Handle queries
    var search = location.search;
    if (search) {
        var id = search.substr(1);
        for (var i = photos.length - 1; i >= 0; i--) {
            var post = photos[i];

            if (post.id === id) {
                showPhotoPopup(post);
                break;
            }
        };
    }
});

// Show a photo popup
function showPhotoPopup (post) {
    // Create permalink
    var baseUrl = 'https://projectsecretidentity.org/all.html?';
    var permalink = encodeURIComponent(baseUrl + post.id);

    // Updated URL
    history.replaceState(null, null, '/?' + post.id);

    // Create HTML
    var slideHtml = renderPhoto(post, { setHeight: false }).html();
    var socialHtml = $('#template-social').html()
                        .replace(/\$url/g, permalink)
                        .replace(/\$blurb/g, encodeURIComponent(post.blurb))
                        .replace(/\$id/g, post.id);
    var html = slideHtml + socialHtml;

    // Show Vex popup
    vex.dialog.alert({
        callback: function () {
            history.replaceState(null, null, '/');
        },
        message: html
    });

    // Update Vex overlay size, and scroll position
    var offsetY = 0;
    var windowHeight = $(window).height();
    var overlayHeight = $('.vex-content').height() + 320;
    $('.vex-overlay').height($('.vex-content').height() + 320);
    $('.vex-overlay').css('min-height', '100%');
    if (overlayHeight > windowHeight) {
        offsetY = (overlayHeight - windowHeight) / 2;
    }
    $('.vex').scrollTop(offsetY);
}

// Render a photo with a blurb
function renderPhoto (post, options) {
    options = options || {};

    var $el = $.template("#template-photo", {
        "caption" : post.blurb,
        "image"   : post.url500
    });

    if (!post.blurb) {
        $el.find("p").remove();
    }

    if (options.setHeight !== false) {
        var height = (post.height / post.width) * 300;
        $el.find("img").height(height);
    }

    $el.on('click', function (e) {
        showPhotoPopup(post);
    });

    return $el;
}

// Render a photo
function renderSimplePhoto (post) {
    var $el = $.template("#template-slide", {
        "image"   : post.url500
    });

    $el.on('click', function (e) {
        showPhotoPopup(post);
    });

    return $el;
}



})(); // :)
