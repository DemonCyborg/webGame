$("#instructText").hide();

$(".bar").click(function(){
    $("#instructText").slideToggle();
});

$(".celebration").hide();

$("#restart").hide();

$(".lup").hide();


var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var index  = 0;
var started = false;

for(var i=0;i<4;i++){
    $(".texture-"+buttonColours[i]).hide();
}

$(".slideUp").click(function(){
    $("#instructText").slideUp();
});



$("#start").click(function(){
    if(!started){
        playSound("gameStart");
        setTimeout(nextSequence,1000);
        started = true;
    }
});




function nextSequence() {

    $("#restart").hide();
    $(".celebration").hide();
    $(".lup").hide();

    $("#level-title").text("Level "+level);
    level++;
   
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoseColour = buttonColours[randomNumber];
    
    

    gamePattern.push(randomChoseColour);
    $("#"+randomChoseColour).fadeOut(150).fadeIn(150); 

    $(".texture-"+randomChoseColour).fadeIn(100).fadeOut(500);

    playSound(randomChoseColour);
    userClickedPattern = [];
    index = 0;
    
}  



$(".but").click(function(event){

    
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(event.target.id);
    checkAnswer(index);
    index++;
});




function animatePress(currentColour){
    
    $("#"+currentColour).fadeOut(100).fadeIn(100); 
}

function playSound(name){
    
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(currentLevel === (gamePattern.length - 1) )
        {   
            // setTimeout(nextSequence,1000);
            setTimeout(newLevel,1000);
        }
    }
    else{
        var failAudio = new Audio("sounds/wrong.mp3");
        failAudio.play();

        $("#level-title").text("OOPS! GAME OVER, You reached level "+(--level)+" ..REMEMBER to click from STARTING COLOR");
        
        $("#restart").show();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
       
        $("#restart").click(function(){
            if(!started)
            {
                started =true;
                playSound("gameStart");
                setTimeout(nextSequence,1000);
            }
        });

    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function newLevel(){
    if(level%5 === 0){
        playSound("crash");
    }
    else{
    playSound("levelUp");
    } 
    $(".celebration").show().fadeOut(1000);
    $(".lup").show().fadeOut(1000);

    setTimeout(nextSequence,1000);
}