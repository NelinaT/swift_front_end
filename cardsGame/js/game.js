var path="../images/Card_Hover_" ;
var imageArray=["22.png","23.png","24.png","25.png","26.png","28.png", "29.png","30.png", "31.png"];
var usedCards;
var cells;
var newCard;
var addPoints;
var score =$("span#score");
var highScore=$("span#highScore");;
var resulWrapper=$(".wrapper");
var allTimeBest=$("#allTimeBest");
var closedCard=path +"10.png";

htmlGenerator();

$(".table").one("click",function(){
    $(".timer div").animate( {width: "0"},
    60000,
    function(){
        
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

function openCard(e){
    var $target = $(e.target);
    
    if($("img.active").length==2){
 
        $("img").removeClass("active");

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
      
        if($("img").length==0){
            victory();
            
        }     
    }
       
   else if(Number(score.text())>0){
        addPoints=Number(score.text())-10;
        score.text(addPoints); 
    }
}

function victory(){
    resulWrapper.addClass("hidden");
    $("#win").removeClass("hidden");
    $(".table").addClass("darken")
    $("#newBest").addClass("hidden");

    $(".timer div").stop();

    addPoints=Number(score.text())+Math.round( $(".timer div").width());

    $("#finalScore").append(score.text(addPoints));

    if(Number(localStorage.highScore)  < score.text()){
        localStorage.highScore=score.text();
        
        $("#newBest").removeClass("hidden");
    }
    allTimeBest.append(localStorage.highScore);
}