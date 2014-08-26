vex.defaultOptions.className = 'vex-theme-flat-attack';

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

    var search = location.search;
    if (search) {
        var id = search.substr(1);
        for (var i = posts.length - 1; i >= 0; i--) {
            var post = posts[i];

            if (post.id === id) {
                showSinglePost(post);
                break;
            }
        };
    }
});

function showSinglePost (post) {
    var permalink = encodeURIComponent('https://projectsecretidentity.org/all.html?' + post.id);

    var html = renderPost(post).html();
    var socialHtml = $('#template-social').html()
                        .replace(/\$url/g, permalink)
                        .replace(/\$id/g, post.id);

    vex.dialog.alert(html + socialHtml);

    $('.vex-overlay').height($('.vex-content').height() + 300);
    $('.vex-overlay').css('min-height', '100%');
    $('.vex').scrollTop(0)
}

function renderPost (post) {
    var $el = $.template("#template-photo", {
        "caption" : post.blurb,
        "image"   : post.url500
    });

    if (!post.blurb) {
        $el.find("p").remove();
    }

    $el.on('click', function (e) {
        showSinglePost(post);
    });

    return $el;
}
