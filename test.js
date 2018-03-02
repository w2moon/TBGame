function c(a,b,c){
console.log(a,b,c);
}

function b(){
    c.apply(null,arguments);
}

b(1,2,3);