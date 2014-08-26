vex.defaultOptions.className = 'vex-theme-default';
vex.dialog.buttons.YES.text = 'Close';

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
        .append($wrapper.children())
        .isotope({
            itemSelector : ".photo",
            masonry : {
                columnWidth : 320,
                isFitWidth  : true
            },
            transitionDuration: 0
        });

    $('.fresh').removeClass('fresh');


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

            $target.isotope('insert', $wrapper.children());

            if (!queue.length) {
                $viewMore.remove();
            }

            $('.fresh').removeClass('fresh');

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

    var html = renderPost(post, { setHeight: false }).html();
    var socialHtml = $('#template-social').html()
                        .replace(/\$url/g, permalink)
                        .replace(/\$blurb/g, encodeURIComponent(post.blurb))
                        .replace(/\$id/g, post.id);

    vex.dialog.alert(html + socialHtml);

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
