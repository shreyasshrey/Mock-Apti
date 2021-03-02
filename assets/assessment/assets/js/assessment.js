var jsonURL = "./assets/data/test.json";
var quesList = null;
var currentQuesNo = 0;
var totalNoOfQues = 0;
var selectedOption = null;
var currentQuesObj = null;
var timeOut = null;
var correctAnswerCount = 0;
var numofQuestions = 0, number = 0;

// variables to store time

var timer2;
var interval;
var storedTime = [];
var minutes;
var seconds;

$(document).ready(function (e) {
    init();
});

function init() {
    $.ajax({
        dataType: "json",
        url: jsonURL,
        success: function (data) {
            timing = data.duration;
            //console.log('JSON data: ' + data);
            quesList = data.quesList;
            totalNoOfQues = Object.keys(quesList).length;
            // debugger
            $(".assessment").css("display", "block");

            // load all question from json to make progreesbar

            for (var i = 1; i <= totalNoOfQues; i++) {
                var questions = quesList['ques' + (i)];
                var totalProQues = Object.keys(questions).length;
                for (var j = 0; j < totalProQues / 3; j++) {
                    numofQuestions++;
                }
            }
            // shuffleQues(quesList);
            timer();
            setQues();
        }
    });
}

function updateProgress() {
    number++;
    width = number / numofQuestions * 100;
    $('#progress #bar').animate({ 'width': width + '%' });
}

// $('#nextBtn').click(function () {
//     if (number >= totalNoOfQues) {
//         return;
//     } else {
//         updateProgress();
//     }
// });

function timer() {
    timer2 = timing;
    $('#demo').html(timer2);
    interval = setInterval(function () {

        var timer = timer2.split(':');

        minutes = parseInt(timer[0], 10);
        seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = (seconds < 0) ? --minutes : minutes;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        if (minutes < 0) clearInterval(interval);
        seconds = (seconds < 0) ? 59 : seconds;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        $('#demo').html(minutes + ':' + seconds);
        timer2 = minutes + ':' + seconds;
        prevTiming = timing.split(':');
        currTiming = timer2.split(':');
        // storedTime.push(timer2);
        if (minutes == 0 && seconds == 0) {
            feedbackFun();
            // $('#demo').html('00:00');
            // clearInterval(interval);
            // $(".assessment").css("display", "none");
            // $('.modal').css('display', 'block');
            // $('.modal-body').append('<h3>You Scored ' + correctAnswerCount + ' Out of ' + totalNoOfQues + '</h3>');
            // $('.modal-title').html('Time Out');
        }
    }, 1000);
    parseInt();
}

function setQues() {
    // parent.preloadVal = 0;
    // parent.progressLoader();
    if (number >= totalNoOfQues) {
        return;
    } else {
        updateProgress();
    }

    $(".questPart,.optPart").css("visibility", "visible");
    $('.optBox').removeClass("selectEnable");

    $(".optBox").unbind("click");
    $("#confirmYES").unbind("click");
    $(".finalizepart").css("visibility", "visible");
    selectedOption = '';

    var quesNo = currentQuesNo + 1;
    $('.presentQues').html(quesNo + ' / ' + totalNoOfQues + ' Questions');
    currentQuesObj = quesList["ques" + quesNo];
    var quesTxt = currentQuesObj.quesTxt;
    //console.log("Before shuffle: "+currentQuesObj.options);
    shuffleArray(currentQuesObj.options);
    //console.log("After shuffle: "+currentQuesObj.options);
    var opt1 = currentQuesObj.options[0];
    var opt2 = currentQuesObj.options[1];
    var opt3 = currentQuesObj.options[2];
    var opt4 = currentQuesObj.options[3];
    var quesImg = currentQuesObj.image;
    var correctAnswer = currentQuesObj.correctAns;

    $("#quesNo").html("Question " + quesNo + ":");
    $("#quesTxt").html("<div>" + quesTxt + "</div>");
    $("#opt1").html(opt1);
    $("#opt2").html(opt2);
    $("#opt3").html(opt3);
    $("#opt4").html(opt4);

    $(".optBox").click(function (e) {
        selectedOption = $(this);
        if (!$(this).hasClass("selectEnable")) {
            $('.optBox').removeClass("selectEnable");
            $(this).addClass("selectEnable");
        }
    });

    $("#confirmYES").click(function (e) {
        currentQuesNo++;
        $("#confirmYES").css('outline', 'none');
        $(".finalBox").css("visibility", "hidden");

        if (selectedOption === '') {
            if (currentQuesNo >= totalNoOfQues) {
                feedbackFun();
                // $('.modal-body').append('<p>Time Taken ' + time + '</p>');
            } else {
                setQues();
            }
        } else if (selectedOption.html() === correctAnswer) {
            console.log("Correct Answer");
            correctAnswerCount++;
            // console.log(correctAnswerCount);
            if (currentQuesNo >= totalNoOfQues) {
                feedbackFun();
                // $('.modal-body').append('<p>Time Taken ' + time + '</p>');
            } else {
                setQues();
            }
        } else {
            if (currentQuesNo >= totalNoOfQues) {
                feedbackFun();
                // $('.modal-body').append('<p>Time Taken ' + time + '</p>');
            } else {
                setQues();
            }
        }
    });
}

function feedbackFun() {
    clearInterval(interval);
    // console.log("Wrong");
    if (minutes == 0 && seconds == 0) {
        $('#demo').html('00:00');
        // clearInterval(interval);
        $(".assessment").css("display", "none");
        // $('.optBox').removeClass("selectEnable");
        $('.modal').css('display', 'block');
        $('.modal-body').append('<h3>You Scored ' + correctAnswerCount + ' Out of ' + totalNoOfQues + '</h3>');
        $('.modal-title').html('Time Out');
    } else {
        $(".assessment").css("display", "none");
        // $('.optBox').removeClass("selectEnable");
        $('.modal').css('display', 'block');
        $('.modal-body').append('<h3>You Scored ' + correctAnswerCount + ' Out of ' + totalNoOfQues + '</h3>');
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}