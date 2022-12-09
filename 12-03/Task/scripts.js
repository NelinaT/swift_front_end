var editWrapper=document.querySelector(".EditPeopleWrapper");
var editButton=document.querySelector(".EditPageButton");
var EditPeopleInput=document.getElementsByClassName("EditPeopleInput");
var addButton=document.getElementById("AddOnePerson");
var saveBtn=document.getElementById("saveBtn");

// var cardArray=[];
var cardArray=[{
    firstname: "Ivan",
    job: "Dev",
    phone: "0888888888888",
    email: "ivan@gmail.com"
},{
    "firstname": "Eva",
    "job": "Frontend",
    "phone": "0878464256",
    "email": "eva@gmail.com"
}];

function toggleFunc(e){
    var activeCard = document.querySelector(".PersonCard.active");
    if (editWrapper.classList.contains("EditPeopleWrapper--expanded")) {
        editWrapper.classList.remove("EditPeopleWrapper--expanded");
        editButton.classList.remove("EditPageButton--active");
        clearFields();
    }
    else {
        editWrapper.classList.add("EditPeopleWrapper--expanded");
        editButton.classList.add("EditPageButton--active");
        addButton.classList.remove("hidden");
        saveBtn.classList.add("hidden");
    }
    if(activeCard){
        activeCard.classList.remove("active");
    }
}

function getCardObj(){
    var requaredFieldEmpty=false;
    var cardObj = {};
    for(var i=0; i< EditPeopleInput.length; i++){
        cardObj[EditPeopleInput[i].name] = EditPeopleInput[i].value;
        if(EditPeopleInput[i].value==""){
            requaredFieldEmpty=true;
            EditPeopleInput[i].classList.add("empty");
        }
        else{
            EditPeopleInput[i].classList.remove("empty");
        }
    }
    if(requaredFieldEmpty ){
        document.querySelector(".requared").classList.remove("hidden");
        return;
    }

    document.querySelector(".requared").classList.add("hidden");

    return cardObj;
}

function submitFunc(e){
    var cardObj =  getCardObj();
    if (cardObj) {
        cardArray.push(cardObj);
        renderNewCard(cardObj, cardArray.length - 1);
    }
}

function renderCards() {
    var cardContainer =  document.querySelector(".PeopleCardsContainer");
    var cardContainerStr = "";

    if (cardArray.length === 0) {
        cardContainer.innerHTML = "No items are added";
        return;
    }

    for (var i = 0; i < cardArray.length; i++) {
        renderNewCard(cardArray[i], i) ;
    }
}

function renderNewCard(cardObj, i) {
    var cardContainer =  document.querySelector(".PeopleCardsContainer");
    if (cardArray.length <= 1 && cardContainer.innerHTML.startsWith("No")) {
        cardContainer.innerHTML = '';
    }
    
    cardContainer.innerHTML += `<div class="PersonCard" data-array-id="` + i + `">
        <div class="PersonImage"></div>
        <div class="PersonName">` + cardObj.firstname + `</div>
        <div class="personJobTitle">` + cardObj.job + `</div>
        <div class="eMail">` + cardObj.email + `</div>
        <div class="PersonPhoneNumber">` + cardObj.phone + `</div>
    </div>`;   

    var idCards=document.getElementsByClassName("PersonCard");

    for( var i=0; i < idCards.length; i++){
        idCards[i].addEventListener('click', editFunc);
    
    }
    
}

function editFunc(event){
    if(event.currentTarget.classList.contains('active')){
        event.currentTarget.classList.remove("active");
        editWrapper.classList.remove("EditPeopleWrapper--expanded");
        editButton.classList.remove("EditPageButton--active");
        clearFields();
        return;
    }
    var activeCard = document.querySelector(".PersonCard.active");
    if(activeCard){
        activeCard.classList.remove("active");
    }
    editWrapper.classList.add("EditPeopleWrapper--expanded");
    editButton.classList.add("EditPageButton--active");
    dataID=event.currentTarget.getAttribute("data-array-id");
    event.currentTarget.classList.add("active");
    document.getElementById("firstname").value=cardArray[dataID].firstname;
    document.getElementById("job").value=cardArray[dataID].job;
    document.getElementById("phone").value=cardArray[dataID].phone;
    document.getElementById("email").value=cardArray[dataID].email;
    addButton.classList.add("hidden");
    saveBtn.classList.remove("hidden");
}

function saveEditedCard(e){
    var id = document.querySelector(".PersonCard.active").getAttribute("data-array-id");
    var cardObj = getCardObj();
    if (!cardObj) {
        return;
    }
    cardArray[id]=cardObj;
    document.querySelector(".requared").classList.add("hidden");
    document.querySelector(".PeopleCardsContainer").innerHTML = '';
    renderCards();
    editWrapper.classList.remove("EditPeopleWrapper--expanded");
    editButton.classList.remove("EditPageButton--active");
    clearFields();
}

function clearFields() {
    document.getElementById("firstname").value=""
    document.getElementById("job").value="";
    document.getElementById("phone").value="";
    document.getElementById("email").value="";
    document.querySelector(".requared").classList.add("hidden");
    var inputs=document.querySelectorAll(".EditPeopleInput");
    for( var i=0; i< inputs.length; i++){
        inputs[i].classList.remove("empty");
    }
}


editButton.addEventListener("click",toggleFunc);
addButton.addEventListener("click", submitFunc);
saveBtn.addEventListener("click",saveEditedCard);
renderCards();