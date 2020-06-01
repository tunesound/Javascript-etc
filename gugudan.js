// 1단
// 단수가 9번
console.log("1x1=1")
console.log("1x2=2")

for (var i = 1; i < 10; i++) {
    console.log("1 x " + i);
}


// 1단~9단
console.log("1x1=1")
console.log("1x2=2")
// 각단에서 1-9 곱한다.
console.log("2x1=2")
console.log("2x2=4")

for (var i = 1; i < 10; i++) {
    for (var j = 1; j < 10; j++) {
        console.log(i + " x " + j + " = " + (j * i));
    }
}


