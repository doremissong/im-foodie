$(".applied-block-btn").click(function(){
    var $CI = $('.applied-block-btn').index(this);
    // console.log($('.applied-block-btn').index(this));
    // console.log($CI);
    // console.log($('.applied-block-btn')[$CI]);

    $($('.applied-contents-none')[$CI]).css({
        display : 'flex'
    });

    $($('.applied-block-btn')[$CI]).css({
        display : 'none'
    });

    $($('.applied-none-btn')[$CI]).css({
        display : 'block'
    });

})

$(".applied-none-btn").click(function(){
    var $DI = $('.applied-none-btn').index(this);

    $($('.applied-contents-none')[$DI]).css({
        display : 'none'
    });

    $($('.applied-block-btn')[$DI]).css({
        display : 'block'
    });

    $($('.applied-none-btn')[$DI]).css({
        display : 'none'
    });

})