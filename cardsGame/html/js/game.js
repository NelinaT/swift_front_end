
// var table = document.createElement("div");
// table.classList.add("table");
// document.body.appendChild(table);
var path="../images/Card_Hover_" ;
var imageArray=["22.png","23.png","24.png","25.png","26.png","28.png", "29.png","30.png", "31.png"];
var usedCards;
var cells;
var newCard;

htmlGenerator();

function htmlGenerator(){
    $('<div/>',{
        class: 'table'
    }).appendTo("body");
    for(var i=0; i<3; i++){
        $("<div>",{
            class :"row"
        }).appendTo(".table");
    }
    for(var j=0; j<6; j++){
        $("<div>",{
            class: "col back"}).clone().appendTo(".row").on("click", openCard);   
    }
    cardCell();
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
            // $(cells[i]).css({
            //     "display": "none"
            //  });
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
            // $(cells[i]).css({
            //         "display": "none"
            //      });
            $(cells[i]).css({
            "background-image": "url("+image.src+")",
            "background-repeat": "no-repeat"
         });
            
        }
    }
}

function openCard(e){
    var $target = $(e.target);
    var flag;
    
    

    if($target.hasClass("col")){
        $target.find("img").removeClass("hidden");
        flag=true;
        return;
    }
    else{
        $target.addClass("hidden"); 
        flag=false;
    }

        compareCards($target, $("hidden"));

   
    
}

function compareCards(firstCard,secondCardB){
    console.log(firstCard, "2" +secondCardB);



}


// $('.col').prepend('<img id="theImg" src="../images/Card_Hover_28.png" />');
// $('.col').prepend('<img src="' + randomCard() + '"/>');


