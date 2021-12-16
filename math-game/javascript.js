var startGame = document.getElementById("start");
var restartGame = document.getElementById("reset");
restartGame.style.visibility = "hidden";
startGame.style.visibility = "visible";

var score = 0;
var timer = "";

startGame.onclick = function(){
    document.getElementById("reset").style.visibility = "visible";
    document.getElementById("start").style.visibility = "hidden";
    start();  
}

function start(){
    document.getElementById("reset").style.visibility = "visible";
    document.getElementById("start").style.visibility = "hidden";
    time();
    generate();
}

function generate(){
    document.getElementById("correct").style.visibility = "hidden";
    
    var firstNumber = Math.round(Math.random()*15);
    var secondNumber = Math.round(Math.random()*15);
    var mul = firstNumber * secondNumber;
    
    document.getElementById("question").innerHTML = firstNumber + "X" + secondNumber;
    
    var correctOption = Math.round(Math.random()*(4-1)) + 1;
    
    for(i = 1; i < 5; i++){
        if(i == correctOption){
            document.getElementById("option" + correctOption).innerHTML = mul;
        }
        else{
            document.getElementById("option" + i).innerHTML = Math.round(Math.random()*(15*15));
        }
    }
    
    document.getElementById("option1").onclick = function(){
        check(1);
    }
    
    document.getElementById("option2").onclick = function(){
        check(2);
    }
    
    document.getElementById("option3").onclick = function(){
        check(3);
    }
    
    document.getElementById("option4").onclick = function(){
        check(4);
    }
    
    function check(i){
        if(document.getElementById("option" + i).innerHTML == mul){
            correct();
        }
        else{
            wrong();
        }
    }
}

function time(){
    document.getElementById("time").style.visibility = "visible";
    var count = 59;
    timer = setInterval(
        function(){
            document.getElementById("timeValue").innerHTML = count;
            count--;
            if(count == -1){
                clearInterval(timer);
                gameOver();
            }
        }, 1000
    );
}

restartGame.onclick = function(){
    restart();
}

function restart(){
    score = 0;
    document.getElementById("value").innerHTML = score;
    clearInterval(timer);
    document.getElementById("gameover").style.visibility = "hidden";
    start();
}

function gameOver(){
    document.getElementById("scoreValue").innerHTML = score;
    document.getElementById("gameover").style.visibility = "visible";
    startGame.onclick = function(){
        document.getElementById("gameover").style.visibility = "hidden";
        start();  
        document.getElementById("value").innerHTML = 0;
        score = 0;
    }
    
    startAgain();
}

function startAgain(){
    restartGame.style.visibility = "hidden";
    startGame.style.visibility = "visible";
    clearInterval(timer);
}

function correct(){
    score++;
    document.getElementById("value").innerHTML = score;
    document.getElementById("correct").style.visibility = "visible";
    var correctTime = 0;
    var correctTimer = setInterval(
        function(){
            if(correctTime == 1){
                document.getElementById("correct").style.visibility = "hidden";
                clearInterval(correctTimer);
                generate();
            }
            correctTime++;
        }, 100
    );
}

function wrong(){
    document.getElementById("wrong").style.visibility = "visible";
    var correctTime = 0;
    var correctTimer = setInterval(
        function(){
            if(correctTime == 1){
                document.getElementById("wrong").style.visibility = "hidden";
                clearInterval(correctTimer);
                generate();
            }
            correctTime++;
        }, 100
    );
}