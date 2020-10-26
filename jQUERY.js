//click start
    //Game over?->Hide game over, Repeat step 1
    //Game running?->Reset
    //else
        //1.start the game-->
            //show trials left div
        //2. Generate fruit
            //Generate a random fruit and move the fruit down-->
            //if fruit is catched-
                //update score, show animation and play sound
            //else-
                //reduce trial
                //check if any trial left?
                    //yes: Repeat step 2
                    //no : Show game over

var reset = false;
var trials = 3;
var fruits = ["mango", "apple", "banana", "orange", "cherries", "grapes", "peach", "pear", "watermelon", "cock", "strawberry", "tomato", "bomb", "danger"];
var move = "";
var score = 0;
var generatedFruit;

$(function(){
    $("#start").click(function(){
        if(reset == true){
            location.reload();
        }
        else{
            trials = 3;
            score = 0;
            $("#value").html(score);
            reset = true;
            $("#start").html("Reset Game");
            $("#gameover").hide();
            $("#trialsLeft").show();
            setTimeout(startTheGame(), 500);
        }
    });
    
    //Slice fruit
    $("#fruit").mouseover(function(){
        $(this).hide("explode", 500);
        //document.getElementById("sound").play();
        if(generatedFruit == "bomb" || generatedFruit == "danger"){
            trials = 0;
            gameOver();
            $("#bomb")[0].play();
        }
        else if(generatedFruit == "cock"){
            score++;
            $("#value").html(score);
            $("#chicken")[0].play();
        }
        else{
            score++;
            $("#value").html(score);
            $("#sound")[0].play();
        }
        
        clearInterval(move);
        setTimeout(function(){
            //$("#fruit").show();
            startTheGame();
        }, 1000);
    });

});


function startTheGame(){
    //$("#fruit").css("top", "-60px");
    if(trials < 1) {
        gameOver();
    }
    else{
        trialCalculate();
        generateFruit();
        moveFruit();
    }
}

function trialCalculate(){
    $("#trialsLeft").empty();
    for(i = 0; i < trials; i++){
        $("#trialsLeft").append('<img src="images/heart.png" width="15px" height="15px" class="life">');
    }
}

function generateFruit(){
    generatedFruit = fruits[Math.round(Math.random()*13)];
    $("#fruit").attr('src', 'images/' + generatedFruit + '.png');
    $("#fruit").css("left", Math.round(Math.random()*550));
    $("#fruit").css("top", "-60px");
    $("#fruit").show();
}

function moveFruit(){
    
    move = setInterval(function(){
        $("#fruit").css("top", $("#fruit").position().top + 5);
        if($("#fruit").position().top > $("#fruitContainer").height()){
            
            if(generatedFruit == "bomb" || generatedFruit == "danger"){
                clearInterval(move);
                setTimeout(startTheGame(), 500);
            }
            else{
                trials--;
                clearInterval(move);
                setTimeout(startTheGame(), 500);
            }
            
        }
        
    }, 15);
    
}

function gameOver(){
    $("#scoreValue").html(score);
    $("#gameover").show();
    $("#trialsLeft").hide();
    $("#start").html("Start Game");
    reset = false;
    clearInterval(move);
}
