$(".imade-block-btn").click(function(){
    var $CI = $('.imade-block-btn').index(this);
    // console.log($('.imade-block-btn').index(this));
    // console.log($CI);
    // console.log($('.imade-block-btn')[$CI]);

    $($('.imade-contents-none')[$CI]).css({
        display : 'flex'
    });

    $($('.imade-block-btn')[$CI]).css({
        display : 'none'
    });

    $($('.imade-none-btn')[$CI]).css({
        display : 'block'
    });

})

$(".imade-none-btn").click(function(){
    var $DI = $('.imade-none-btn').index(this);

    $($('.imade-contents-none')[$DI]).css({
        display : 'none'
    });

    $($('.imade-block-btn')[$DI]).css({
        display : 'block'
    });

    $($('.imade-none-btn')[$DI]).css({
        display : 'none'
    });

})