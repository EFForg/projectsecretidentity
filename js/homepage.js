// OWL Carousel
$('.slider').owlCarousel({
    singleItem: true
});

// Isotope
var $isotope = $(".isotope");
var size = $isotope.data('image-size');
var imageCount = $isotope.data("image-count");
var queue = [];

$.getJSON("data/posts.json", function (posts) {
    var $wrapper = $("<div>");

    for (var i in posts) {
        var post = posts[i];

        if (i > imageCount) {
            queue.push(post);
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
