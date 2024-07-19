$(document).ready(function() {
    $('.main-pageNumberNum1').click(function() {
        var currentColor = $(this).css('color');
        if (currentColor === 'rgb(80, 121, 226)') {
            $(this).css('color', '#a5a5a5');
        } else {
            $(this).css('color', '#5079E2');
        }
    });
});

$(document).ready(function() {
    $('.main-pageNumberNum').click(function() {
        var currentColor = $(this).css('color');
        if (currentColor === 'rgb(80, 121, 226)') {
            $(this).css('color', '#a5a5a5');
        } else {
            $(this).css('color', '#5079E2');
        }
    });
});

$(document).ready(function(){
    $(".main-downscrollButton").click(function(){
        $(".main-sortOrder").toggle();
    });
});


