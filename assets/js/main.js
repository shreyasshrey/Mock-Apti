window.onload = init();

var preloadVal = 0;

function init() {
    'use strict';
    // resizeIframe();
    $('img').on('dragstart', function (event) { event.preventDefault(); });
    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
    $('img').attr('draggable', false);
    // progressLoader();
    document.getElementById("shell").src = "assets/intro/intro.html";
}


// function progressLoader() {
//     // loaderblock = true;
//     setTimeout(function () {
//         preloadVal += 0.1;
//         textItem = "Loading " + (preloadVal.toFixed(1) * 100) + "%";
//         $('.loadTitle').html(textItem);
//         $('.loader').css("display", 'block');
//         $('mainContent,.main').css('opacity', '0.2');
//         if (preloadVal >= 1) {
//             $('.loader').css("display", 'none');
//             $('mainContent,.main').css('opacity', '1');
//             return
//         }
//         progressLoader();
//     }, 100);
// }

// function resizeIframe() {
//     document.getElementById("shell").style.height = document.getElementById("shell").contentWindow.document.body.scrollHeight + 'px';
// }