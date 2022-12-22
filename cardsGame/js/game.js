
// var table = document.createElement("div");
// table.classList.add("table");
// document.body.appendChild(table);
var path="../images/Card_Hover_" ;
var imageArray=["22.png","23.png","24.png","25.png","26.png","28.png", "29.png","30.png", "31.png"];
var usedCards;
var cells;
var newCard;
var addPoints;
var score;
var highScore=0;
var resulWrapper=$(".wrapper");
var allTimeBest=$("#allTimeBest");
score=$("span#score");
highScore=$("span#highScore");
// highScore.text(localStorage.highScore());

htmlGenerator();

// $("img").click(function(){
//     debugger
//     $(this).toggleClass("active");
// })

$(".table").one("click",function(){
    $(".timer div").animate( {width: "0"},
    60000,
    function(){
        //redirect here
       window.location.href="gameOver.html?points="+score.text();
    
    })
  });

function htmlGenerator(){
    for(var i=0; i<3; i++){
        $("<div>",{
            class :"row"
        }).appendTo(".table");
    }
    for(var j=0; j<6; j++){
        $("<div>",{
            class: "col "}).clone().appendTo(".row").on("click", openCard);   
    }
    cardCell();
    // var localHighScore= localStorage.highScore
    if(localStorage.highScore){
        highScore.text(localStorage.highScore);
    }
}
    
function randomCard(){

    var rand = imageArray[Math.floor(Math.random() * imageArray.length)];
    
    return rand;
}

function cardCell(){
    usedCards=[];
    cells=$(".col");

    for(var i=0; i<cells.length;i++){
        newCard=randomCard();
        var closedCard=path +"10.png";
        var image= new Image();
        image.src = path + newCard;
        if($.inArray( newCard, usedCards )<0){

            $(cells[i]).prepend('<img src="' + closedCard + '"/>');
            $(cells[i]).css({
                "background-image": "url("+image.src+")",
                "background-repeat": "no-repeat"
             });
            usedCards.push(newCard);

        }
        else{
            var index=$.inArray( newCard, imageArray );
            $(cells[i]).prepend('<img src="' +closedCard + '"/>');
            usedCards.push(newCard);
            imageArray.splice(index, 1);

            $(cells[i]).css({
            "background-image": "url("+image.src+")",
            "background-repeat": "no-repeat"
         });
            
        }
    }
}

// $("img").addClass("active");


function openCard(e){
    var $target = $(e.target);
    
    if($("img.active").length==2){
       
        $("img").removeClass("active");
        // $("img").addClass("unactive");
  

    }
    if($target.hasClass("col")){
        $target.find("img").removeClass("active");



    }
    else{
        $target.addClass("active"); 



    }
    if($("img.active").length==2){
       
        compareCards( $("img.active"));
        
    }
 
};

function compareCards(clickedCards){
  
    var backgroundClickedFirstCard=$(clickedCards).eq(0).parent().attr("style");
    var backgroundClickedSecondCard=$(clickedCards).eq(1).parent().attr("style");
   
    if(backgroundClickedFirstCard==backgroundClickedSecondCard){
    
        $(clickedCards).remove();
        
        addPoints=Number(score.text())+100;
        score.text(addPoints); 
        if( highScore.text()< addPoints ){
            highScore.text(addPoints);
            // localStorage.highScore= addPoints;
        }
        if($("img").length==0){
            resulWrapper.addClass("active");
            $("#win").removeClass("active");
            $(".table").addClass("darken")
            $("#finalScore").append(score.text());
            $("#newBest").addClass("active");
           
            $(".timer div").stop();
            addPoints=Number(score.text())+Math.round( $(".timer div").width());
            highScore.text(addPoints);
            allTimeBest.append(highScore.text());
    
    
            console.log($(".timer div").width());
    
            if(Number(localStorage.highScore)  < highScore.text()){
                localStorage.highScore=highScore.text();
                $("#newBest").removeClass("active");
            }
        }
       
    }
   else if(Number(score.text())>0){
        addPoints=Number(score.text())-10;
        score.text(addPoints); 
    }
}