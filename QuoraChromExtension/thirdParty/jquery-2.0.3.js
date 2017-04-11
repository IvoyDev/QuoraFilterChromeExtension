//<script src="http://code.jquery.com/jquery-2.0.3.js"></script>


$(window).scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        // do something
        console.log("Haven't scrolled in 250ms!");
    }, 250));
});