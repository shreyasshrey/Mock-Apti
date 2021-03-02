window.onload = init();

function init() {
    $('.introPage').css('display', 'block');
}

$('#letsgo,#letsgo1').click(function () {
    $('.introPage').css('display', 'none');
    $('.startPage').css('display', 'block');
});

$('#btnstart').click(function () {
    window.location = "../assessment/assessment.html";
    // window.location = "../assessment/assessment.html" + this.id;
});