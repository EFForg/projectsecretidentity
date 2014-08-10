$.getJSON("data/posts.json", function (posts) {
    var $wrapper = $("<div>");

    for (var i in posts) {
        var post    = posts[i];
        var caption = post["photo-caption"].trim();
        var image   = post["photo-url-500"].replace(/^http:\/\/\d+/, "https://38");
        var imageXL = post["photo-url-1280"].replace(/^http:\/\/\d+/, "https://38");

        var $el = $.template("#template-photo", {
            "caption" : caption,
            "image"   : image,
            "data-xl" : imageXL
        });

        if (!caption) {
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
