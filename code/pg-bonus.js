$(document).ready(function(){
    $("#kitty1").show();

    $("#leonidas").click(function(){
        $("#headpic").attr('src', 'leo-sm.jpg').attr('class', 'img-circle img-responsive animated rotateInDownLeft');
        $("#kitty1").hide();
        $("#kitty2").show();
    });

    $("#pgpic").click(function(){
        $("#headpic").attr('src', 'penguin-square.jpg');
        $("#kitty1").show();
        $("#kitty2").hide();
    });

$.material.ripples()

/* stupid former ajax call code.

$("#autopubs").load("pubslist.html");

*/

/* binds to the outside thing because jquery can't stick
listeners on stuff that isn't in the dom on page load.  so I threw in a div
around the div, and bound the listeners to that instead.  see the
section on delegated events here http://api.jquery.com/on/ --
the invocation of the bootstrap collapse thing bubbles out to its
parents and grandparents &c because, the fuckin' dom, and so
the external div can catch it.  And this long explanation is in here
because I don't really know this dom stuff, and so I'm not going to remember
it the next time I look.  Don't blow up your code in a month, Gowder.

*/
$('#outsideAutopubs').on('show.bs.collapse', function () {
    $('.collapse.in').collapse('hide');
});

/*
a fun experiment/easter egg below: pressing u will on keyboard will gently scroll
user back to top of the page; pressing d will gently scroll down.
useful to find keycodes http://www.javascripter.net/faq/onkeypress.htm#top
*/

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 85) {
        $('html, body').animate({scrollTop: 0}, 15000);
    }
    else if(event.keyCode == 68) {
        $('html, body').animate({scrollTop: $(document).height()-document.body.clientHeight}, 15000);
    }

});



});
