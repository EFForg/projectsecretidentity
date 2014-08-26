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
            }
        });
});

function renderPost (post) {
    var photo = post.url500;

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
