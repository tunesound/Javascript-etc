var canvas = document.getElementById("canvas");  //HTML 캔버스 요소에 캔버스 객체생성
var ctx = canvas.getContext("2d");  //캔버스 객체에 2d 드로잉 객체생성
var radius = canvas.height / 2;  //캔버스 높이를 사용하여 시계 반경 계산
ctx.translate(radius, radius);  //캔버스의 중심으로 (그리기 객체의)(0,0) 위치를 다시 매핑
radius = radius * 0.90  //시계 반경을 줄여 (90%까지) 캔버스 내부에 시계를 그린다
setInterval(drawClock, 1000);  //시계를 그리는 함수 생성 (간격은 밀리초. 1000밀리 세컨마다 호출)

function drawClock() {  //시계면을 그리기 위한 drawFace() 함수를 생성
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    //흰 동그라미 그리기
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'powderblue';
    ctx.fill();
    //방사형 그래디언트 생성(원본 시계 반경의 95% 및 105%)
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    //원호의 안쪽, 중간 및 바깥 쪽 가장자리에 해당하는 3가지 색상 멈춤을 생성
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'red');
    grad.addColorStop(1, 'black');
    //그라디언트를 그리기 객체의 획 스타일로 정의
    ctx.strokeStyle = grad;
    //드로잉 객체의 선 너비를 정의 (반경의 10%)
    ctx.lineWidth = radius * 0.1;
    //원 그리기
    ctx.stroke();
    //시계 센터 그리기
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) { 
    var ang;
    var num;
    //드로잉 객체의 글꼴 크기를 반경의 15%로 설정
    ctx.font = radius * 0.15 + "px arial";
    //텍스트 정렬을 중간과 인쇄 위취의 가운데로 설정
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    //반지름의 85%까지 인쇄 위치(12개의 숫자)를 계산하고 숫자에 대해 회전(PI / 6)설정
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    //날짜를 사용하여 시간, 분, 초를 얻는다
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //시침의 각도를 계산하고 길이(반지름의 50%)와 너비(반지름의 7%)를 그린다
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.6, radius * 0.07);
    //분침 설정
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.75, radius * 0.07);
    //초침 설정
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.8, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

//알람 설정
var alarmTimer = null;
var alarmSet;

function setAlarm() { alarmSet = true; }
function clearAlarm() { alarmSet = false; }
function initAlarm() {
    if (alarmTimer != null) clearInterval(alarmTimer);
    var nowTime = new Date();
    clearAlarm();
    document.exf1.h.value = nowTime.getHours();
    document.exf1.m.value = nowTime.getMinutes();
    document.exf1.s.value = nowTime.getSeconds();
    alarmTimer = setInterval("countTime()", 1000);
}

function matchH() { return (document.exf1.ch.value == document.exf1.h.value); }
function matchM() { return (document.exf1.cm.value == document.exf1.m.value); }
function matchS() { return (document.exf1.cs.value == document.exf1.s.value); }
function countTime() {
    var nowTime = new Date();
    document.exf1.ch.value = nowTime.getHours();
    document.exf1.cm.value = nowTime.getMinutes();
    document.exf1.cs.value = nowTime.getSeconds();
    if (matchH() && matchM() && matchS()) {
        alert("알람작동 !!!!!!!!!! 두두두두두두두두 !!!!!!!!!!!!");
    }
}
onload = initAlarm;

