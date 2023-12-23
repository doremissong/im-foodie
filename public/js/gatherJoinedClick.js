$(".joined-block-btn").click(function(){
    var $CI = $('.joined-block-btn').index(this);
    // console.log($('.joined-block-btn').index(this));
    // console.log($CI);
    // console.log($('.joined-block-btn')[$CI]);

    $($('.joined-contents-none')[$CI]).css({
        display : 'flex'
    });

    $($('.joined-block-btn')[$CI]).css({
        display : 'none'
    });

    $($('.joined-none-btn')[$CI]).css({
        display : 'block'
    });

})

$(".joined-none-btn").click(function(){
    var $DI = $('.joined-none-btn').index(this);

    $($('.joined-contents-none')[$DI]).css({
        display : 'none'
    });

    $($('.joined-block-btn')[$DI]).css({
        display : 'block'
    });

    $($('.joined-none-btn')[$DI]).css({
        display : 'none'
    });

})