$.getJSON("data/posts.json", function (posts) {
    var $wrapper = $("<div>");

    for (var i in posts) {
        var post    = posts[i];

        var $el = $.template("#template-photo", {
            "caption" : post.blurb,
            "image"   : post.url500,
            "data-xl" : post.url1280
        });

        if (!post.blurb) {
            $el.find('p').remove();
        }

        var height  = (post.height / post.width) * 300;
        $el.find("img").height(height);

        $wrapper.append($el);
    }

    $(".isotope")
        .empty()
        .append($wrapper.children());

    $(".isotope").isotope({
        itemSelector : ".photo",
        masonry : {
            columnWidth : 320,
            isFitWidth  : true
        }
    });
});
