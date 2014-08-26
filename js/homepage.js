vex.defaultOptions.className = 'vex-theme-flat-attack';

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

$.getJSON("data/posts.json", function (posts) {
    var $wrapper = $("<div>");

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        // Show featured images
        if (!post.tags || post.tags.indexOf('featured') == -1) {
            continue;
        }

        var $el = renderPost(post);

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
            },
            transitionDuration: 0
        });
});

function showSinglePost (post) {
    var permalink = encodeURIComponent('https://projectsecretidentity.org/all.html?' + post.id);

    var html = renderPost(post, { setHeight: false }).html();
    var socialHtml = $('#template-social').html()
                        .replace(/\$url/g, permalink)
                        .replace(/\$id/g, post.id);

    vex.dialog.alert(html + socialHtml);

    $('.vex-overlay').height($('.vex-content').height() + 300);
    $('.vex-overlay').css('min-height', '100%');
    $('.vex').scrollTop(0)
}

function renderPost (post, options) {
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
        showSinglePost(post);
    });

    return $el;
}
