var $target = $(".target");
var $viewMore = $("#view-more");
var imageCount = +$target.data('image-count') || 3;
var queue = [];

$.getJSON("data/posts.json", function (posts) {
    var $wrapper = $("<div>");

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        if (i >= imageCount) {
            queue.push(post);
            continue;
        }

        var $el = renderPost(post);

        $wrapper.append($el);
    }

    $target
        .empty()
        .append($wrapper.children());

    // Animate in after a delay
    setTimeout(function () {
        $target.find('.photo').css('opacity', 1);
    }, 100);


    $viewMore
        .removeAttr("disabled")
        .on("click", function () {
            var $wrapper = $("<div>");
            for (var i = 0; i < imageCount; i++) {
                if (!queue.length) {
                    break;
                }

                var post = queue.shift();

                var $el = renderPost(post);

                $wrapper.append($el);
            }

            $target.append($wrapper.children());

            if (!queue.length) {
                $viewMore.remove();
            }

            // Animate in after a delay
            setTimeout(function () {
                $target.find('.photo').css('opacity', 1);
            }, 100);

        });

    if (queue.length) {
        $viewMore.show();
    }
});

function renderPost (post) {
    var $el = $.template("#template-photo", {
        "caption" : post.blurb,
        "image"   : post.url1280
    });

    if (!post.blurb) {
        $el.find("p").remove();
    }

    return $el;
}
