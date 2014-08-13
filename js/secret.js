var $isotope = $(".isotope");
var imageCount = $isotope.data('image-count') || 999999;
var queue = [];

$.getJSON("data/posts.json", function (posts) {
    var $wrapper = $("<div>");

    for (var i in posts) {
        var post = posts[i];

        if (i > imageCount) {
            queue.push(post);
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

    $('#view-more')
        .removeAttr('disabled')
        .on('click', function () {
            var $wrapper = $('<div>');
            for (var i = 0; i < imageCount; i++) {
                if (!queue.length) {
                    $(this).remove();
                    break;
                }

                var post = queue.shift();

                var $el = renderPost(post);

                $wrapper.append($el);
            }

            $('.isotope').isotope('insert', $wrapper.children());

        });
});

function renderPost (post) {
    var $el = $.template("#template-photo", {
        "caption" : post.blurb,
        "image"   : post.url500,
        "data-xl" : post.url1280
    });

    if (!post.blurb) {
        $el.find('p').remove();
    }

    var height = (post.height / post.width) * 300;
    $el.find("img").height(height);

    return $el;
}
