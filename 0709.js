var myArr = ["하나", 2, "셋", 4];
console.log(myArr.length);
/// Array() 객체에 대해
/// 화면에 값을 출력
// for문을 사용할 수 있어여 함.
/*
배열
 - 속성을 출력 myArr.length
 - 인덱스로 값을 가져올 수 있다. myArr[2]출력
 - 대상 엘리먼트 선택
  document.getElementById("아이디")
- 값 입력 출력 innerHTML 속성을 사용
- for(초기값; 조건; 증가) {코드블럭}
*/

//0부터 9까지 출력하는 for문
// 홀수 짝수를 출력 (2==1)짝수 (2==2)홀수
for (var start = 0; start < 10; start++) {
    //stert;
    if (start % 2 == 1) {
        console.log(start);
    }
    // 처리가 끝날때까지 i는 0이다.

}

// 
if (start % 2 == 1) {
    console.log("참");
}

