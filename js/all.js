var $target = $(".target");
var imageCount = $target.data('image-count');
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

    $target
        .empty()
        .append($wrapper.children());

    // Animate in after a delay
    setTimeout(function () {
        $target.find('.photo').css('opacity', 1);
    }, 100);


    $("#view-more")
        .removeAttr("disabled")
        .on("click", function () {
            var $wrapper = $("<div>");
            for (var i = 0; i < imageCount; i++) {
                if (!queue.length) {
                    $(this).remove();
                    break;
                }

                var post = queue.shift();

                var $el = renderPost(post);

                $wrapper.append($el);
            }

            $target.append($wrapper.children());

            // Animate in after a delay
            setTimeout(function () {
                $target.find('.photo').css('opacity', 1);
            }, 100);

        });
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
