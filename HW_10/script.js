// task 1
var arr=[5, 8, 1, 96, 45, 0, -3];
 
var maxValue=arr[0];


for(var i=1; i < arr.length; i++){

    if(maxValue < arr[i]){
        maxValue=arr[i];
    }

}
console.log(maxValue);

// task 2

var names=["Maria", "Plamena", "Ivo", "Ivan", "Konstantin", "Elena", "Nikola", "Krasi", "Emil", "Antonia"];
var evenNames=[], oddNames=[];

for(var i=0; i< names.length; i++){
    if(i % 2 ===0){
        evenNames.push(names[i]);
    }
    else{
        oddNames.push(names[i]);
    }
}
 console.log(names);
 console.log(evenNames);
 console.log(oddNames);
  
//  task 3

var numbers=[3,9,-89,16,33,12,9,38,14,-78,0];
var temp;

for(var i=0; i < numbers.length; i++){
    for(var j=i+1; j < numbers.length; j++){
        if(numbers[i] > numbers[j]){
            temp=numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = temp;
        }

    }
}

console.log(numbers);