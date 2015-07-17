$(document).ready(function(){
    $('.slick_amigos').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true
    });
});

$(document).ready(function(){
    $('.slick_ja_tenho_target').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true
    });
});

$(document).ready(function(){
    $( "#slick_filter" ).keyup(function(){
                var data = $(this).children("input").val();
                console.log(data);
                var rows = $(".slick-slide");
                if (this.value == "") {
                    rows.show();
                    rows.css("position:absolute");
                    return;
                }
                rows.hide();
                rows.filter(function (i, v) {
                    var $t = $(this);
                    var stringsFromRowNodes = $t.children("a").children("hidden")
                        .text().toLowerCase();
                    var searchText = data.toLowerCase();
                    if(stringsFromRowNodes.indexOf(searchText) != -1){
                        console.log(stringsFromRowNodes);
                        $t.css("position:absolute");
                        return true;
                    }
                    if(stringsFromRowNodes.indexOf("default") != -1){
                        $t.css("position:initial");
                        return true;
                    }
                    $t.css("position:initial");
                    return false;
                })
                    .show();
            });
});
