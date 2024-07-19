$(".menu").on("click", checkMenuOn);

let $communityHiddenMenu = $(".communityHiddenMenu");

function checkMenuOn() {
    if ($communityHiddenMenu.css("display") === "none") {
        $communityHiddenMenu.css("display", "block");
    } else {
        $communityHiddenMenu.css("display", "none");
    }
};


$(document).ready(function() {
    $('.bpNbnumber1').click(function() {
        var currentColor = $(this).css('color');
        if (currentColor === 'rgb(80, 121, 226)') {
            $(this).css('color', '#D9D9D9');
        } else {
            $(this).css('color', '#5079E2');
        }
    });
});

$(document).ready(function() {
    $('.b-pN--b-number').click(function() {
        var currentColor = $(this).css('color');
        if (currentColor === 'rgb(80, 121, 226)') {
            $(this).css('color', '#D9D9D9');
        } else {
            $(this).css('color', '#5079E2');
        }
    });
});

$(document).ready(function(){
    $(".downscrollButton").click(function(){
        $(".sortOrder").toggle();
    });
});


