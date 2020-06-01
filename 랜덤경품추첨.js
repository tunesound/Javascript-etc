/*
랜덤경품추첨
1.당청 상품으로 담고 있는 배열 만들기
2.상품을 순서대로 출력할 수 있다.
3.상품 순서를 랜덤하게 바꿀 수 있다. (랜덤 함수만들기)
4.추첨 상품을 하나씩 추출할 수 있다.
5.추첨 후 랜덤함수를 적용할 수 있다.
*/ 

var prize = ['세탁기', '청소기', '드라이기', '꽝', '꽝', '꽝', '꽝', '꽝', '꽝', '꽝'];
function shakeBox() {
    prize.sort(function (a, b) {
        return 0.5 - Math.random();
    });
    console.log(prize);
}
function isWinner() {
    var item = prize.pop();
    if (item) {
        console.log("당신의 상품은 '" + item + "'입니다.");
    } else {
        console.log("추첨이 끝났습니다. 다음 기회에 ㅠㅠ");
    }
}
var prizeLen = prize.length;
for (var i = 0; i < prizeLen; i++) {
    shakeBox();
    isWinner();
}
