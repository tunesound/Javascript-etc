function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);

  //렌즈 생성
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");

  //삽입 렌즈
  img.parentElement.insertBefore(lens, img);

  // 결과 div와 렌즈 사이의 비율을 계산
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;

  //결과 div의 배경 속성 설정
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  
  // 이미지 위로 렌즈를 움직일때 함수실행
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);

  //그리고 터치 스크린 용도
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;

    //이미지 위로 이동할 때 발생할 수 있는 다른 작업을 방지
    e.preventDefault();

    //커서의 X및 Y위치를 얻음
    pos = getCursorPos(e);

    //렌즈 위치를 계산
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);

    //렌즈가 이미지 바깥에 위치하지 못하도록 설정
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}

    //렌즈의 위치를 설정
    lens.style.left = x + "px";
    lens.style.top = y + "px";

    //렌즈가 "보는 것"을 표시
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;

    //이미지 X및 Y위치를 얻는다
    a = img.getBoundingClientRect();

    //이미지와 관련하여 커서의 X및 y좌표를 계산
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    //모든 페이지 스크롤을 고려
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}
//확대 &축소 효과시작
imageZoom("myimage", "myresult");

