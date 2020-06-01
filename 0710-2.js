function myFn(param) {
    var num = 1;
    for (var i = 0; i < 3; i++) {
        console.log(param + num);
    }
}
myFn("하늘"); // 실행해서 하늘1을 3번 출력

for (var i = 0; i < 3; i++) {
    myFn("땅");
}

function myFn2() {
    var srt = "바다";
    myFn(str);
}
myFn2();
