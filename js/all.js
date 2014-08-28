(function() { // :)


// Configure Vex modals
vex.defaultOptions.className = 'vex-theme-default';
vex.dialog.buttons.YES.text = 'Close';


$.getJSON("data/posts.json", function (photos) {
    var $isotope = $(".isotope");
    var imageCount = +$isotope.data('image-count') || 3;
    var queue = [];

    // Temporary photo storage unit
    var $photosForIsotope = $("<div>");

    for (var i = 0; i < photos.length; i++) {
        var post = photos[i];

        if (i >= imageCount) {
            queue.push(post);
            continue;
        }

        var $el = renderPhoto(post);

        $photosForIsotope.append($el);
    }

    // Set up Isotope
    $isotope
        .empty()
        .append($photosForIsotope.children())
        .isotope({
            itemSelector : ".photo",
            masonry : {
                columnWidth : 320,
                isFitWidth  : true
            },
            transitionDuration: 0
        });

    $('.fresh').removeClass('fresh');


    // Wire up the View More button
    var $viewMore = $("#view-more");
    $viewMore
        .removeAttr("disabled")
        .on("click", function () {
            var $photosForIsotope = $("<div>");
            for (var i = 0; i < imageCount; i++) {
                if (!queue.length) {
                    break;
                }

                var post = queue.shift();

                var $el = renderPhoto(post);

                $photosForIsotope.append($el);
            }

            $isotope.isotope('insert', $photosForIsotope.children());

            if (!queue.length) {
                $viewMore.remove();
            }

            $('.fresh').removeClass('fresh');

        });

    if (queue.length) {
        $viewMore.show();
    }

    // Handle queries
    var search = location.search;
    if (search) {
        var id = search.substr(1);
        for (var i = photos.length - 1; i >= 0; i--) {
            var post = photos[i];

            if (post.id === id) {
                showSinglePhoto(post);
                break;
            }
        };
    }
});

// Show a photo popup
function showSinglePhoto (post) {
    // Create permalink
    var baseUrl = 'https://projectsecretidentity.org/all.html?';
    var permalink = encodeURIComponent(baseUrl + post.id);

    // Create HTML
    var html = renderPhoto(post, { setHeight: false }).html();
    var socialHtml = $('#template-social').html()
                        .replace(/\$url/g, permalink)
                        .replace(/\$blurb/g, encodeURIComponent(post.blurb))
                        .replace(/\$id/g, post.id);

    // Show Vex popup
    vex.dialog.alert(html);

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

// Render the simple photo template
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
        showSinglePhoto(post);
    });

    return $el;
}




})(); // :)
