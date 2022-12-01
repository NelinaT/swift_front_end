var a=0;
function chooseNumber(number){
    if(document.title!==isNaN){
        a= a*10+number;
        console.log(a);
    }
    else{
        document.title=a;
        console.log("num");
    }
    return a;
}
sum=0;
diff=0;

function operation(simbol){
   if(simbol=="+"){
       sum+=a;
       document.title=sum + "+";
       a=0;
       return sum;
    }
    if(simbol=="-"){
        diff=diff-
        document.title=sum + "-";
        a=0;
        return sum;
    }
}

function result(){
    var result = operation("+");
    document.title=result;
    sum=0;
    return result;
    
}