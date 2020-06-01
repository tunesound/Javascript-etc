//canvas 엘리먼트에 대한 참조를 canvas변수에 저장
var canvas = document.getElementById("myCanvas");
//canvas에 그리기 위해 실질적으로 사용되는 도구인 
//2d rendering context를 ctx 변수에 저장
var ctx = canvas.getContext("2d");
//공의 좌표변수
var x = canvas.width / 2;
var y = canvas.height - 30;
//공의 움직임을 표현하기 위해 더해줄 변수값
var dx = 2;
var dy = -2;
//원의 반지름 값
var ballRadius = 10;
//공을 치기위한 패들
var paddleHeight = 15;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
//버튼클릭을 boolean변수로 정의하고 초기화
var rightPressed = false;
var leftPressed = false;
//벽돌에 대한 변수설정
var brickRowCount = 5;  //벽돌의 열의 수
var brickColumnCount = 10;  //벽돌의 행의 수
var brickWidth = 75;  //벽돌의 가로길이
var brickHeight = 20;  //벽돌의 세로길이
var brickPadding = 10;  //벽돌의 간격
//벽돌이 캔버스의 모서리에 닿지 않게 할 오프셋 변수정의
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//점수계산
var score = 0;
//플레이어 생명횟수
var lives = 3;


//벽돌의 행과 열수만큼 반복되면서 새로운 벽돌을 생성한다
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}


//처음에는 컨트롤 버튼,마우스가 눌려지지 않은 상태이므로 기본값은 false
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
//키를 누르면 변수에 정보가 저장된다
//어떤 키 하나가 눌려져서 이벤트가 발생하면 KeyDownHandler(),KeyUpHandler()함수가 실행
//각 경우에 관련된 변수가 true로 설정되고, 키에서 손을 때면, 변수값은 false로 되돌아간다.
//e변수로 표시되는 이벤트를 파라미터로 사용
//왼쪽 방향키를 누르면 leftPressed변수가 true로 설정되고,
//오른쪽 방향키를 누르면 rightPressed변수에도 동일한 패턴이 적용된다
function keyDownHandler(e) {
    if (e.keyCode == 39) {  
        rightPressed = true;
    } else if (e.keyCode == 37) { 
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}


//포인터 촤표를 기반으로 패드 위치를 업데이트
//relativeX 뷰포트의 수평 마우스위치(e.clientX)에서 캔버스의 거리를 뺀
//canvas.offsetLeft값을 계산한다
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}


//충돌 감지함수
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            //충돌 감지의 반복에서 사용할 벽돌 객체를 저장하는 b변수를 정의
            var b = bricks[c][r];
            //충돌후에 벽돌을 사라지도록 한다
            //status속성으로 활성상태(stats 1)이면 충돌발생을 확인하여 충돌발생하면
            //다시 그려지지 않게 속성값을 0으로 변경
            if (b.status == 1) {
                //공이 벽돌안에 존재하게 하기위한 4가지 조건은 참이어야 한다
                //공의 x좌표는 벽돌의 x좌표보다 커야한다.
                //공의 x좌표는 벽돌의 x좌표 + 가로 길이보다 작아야 한다.
                //공의 y좌표는 벽돌의 y좌표보다 커야한다.
                //공의 y좌표는 벽돌의 y좌표 + 높이보다 작아야 한다.
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    //충돌이 감지 될 때마다 점수 변수의 값 증가
                    score++;
                    //모든 벽돌이 파괴되었을때 메시지 표시
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        //페이지를 다시로드하고 경고메시지 클릭하면 게임을 다시시작
                        document.location.reload();
                    }
                }
            }
        }
    }
}


//공을 만들기위한 함수
function drawBall() {
    //beginPath()와 closePath()사이에 모든 명령이가 들어감
    ctx.beginPath();
     //arc()메소드를 사용해서 공을 그리기
     //원의 중심을 가리키는 x와 y좌표
     //원의 반지름
     //시작 각도와 끝 각도
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    //fill()메소드 사용으로 공의 색상을 부여
    ctx.fillStyle = "red";
    ctx.fill();  
    ctx.closePath();
}


//공을 치기 위한 패들함수
function drawPaddle() {
    //beginPath()와 closePath()사이에 모든 명령이가 들어감
    ctx.beginPath();
    //패들방향 조정을 위한함수
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    //fill()메소드 사용으로 공의 색상을 부여
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}


//벽돌 생성함수
function drawBricks() {
    //배열안의 모든 벽돌을 반복해서 화면에 그려줄 함수생성
    //다시 행,열 반복을 통해 벽돌의 x,y 값을 설정하고 캔버스에
    //brickWidth * brickHeight 크기의 벽돌들을 그린다.
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                //모든 벽돌들이 좌표(0,0)위치해 있기때문에, 연산을 통해 x,y값을 계산하여
                //벽돌들을 올바른 위치에 알맞은 간격을 두고, 밴버스 모서리로 부터 오프셋
                //값만큼의 거리를 둔 상태로 그릴수 있도록 한다.
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                //beginPath()와 closePath()사이에 모든 명령이가 들어감
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "powderblue";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


//점수 계산함수
function drawScore() {
    ctx.font = "16px Arial";  //글자크기와 글꼴설정
    ctx.fillStyle = "black";  //글꼴의 색상설정
    // 마지막 두개의 매개변수는 score텍스트가 캔버스에 배치될 좌표
    ctx.fillText("Score: " + score, 8, 20); 
}


//플레이어의 생명횟수
function drawLives() {
    ctx.font = "16px Arial";  //글자크기와 글꼴설정
    ctx.fillStyle = "black";  //글꼴의 색상설정
     // 마지막 두개의 매개변수는 Lives텍스트가 캔버스에 배치될 좌표
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}


//매프레임마다 캔버스에 그리는 것을 지속적으로 갱신하기 위한 draw함수
function draw() {
    //매프레임마다 공을 그릴때 이전프레임을 지우주기 위한 clearRect()메소드
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //각각의 함수활성화 호출
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    //좌우 방향으로 공 튕기기
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    //위아래 방향으로 공 튕기기
    //공이 밑면에 닿으면 게임종료
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            //
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                //다음 생명으로 시작할때 공의 위치 재설정
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                //다음 생명으로 시작할때 패들의 위치 재설정
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    //패들 x의 위치는 캔버스의 왼쪽 끝 0위치와 오른쪽 canvas.width-paddleWidth
    //에서 움직인다
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    //공의 움직임을 표현하기 위해
    //x와y에 작은 값을 매프레임마다 더해줄 변수값
    x += dx;
    y += dy;
    //게임 랜더링 방식 requestAnimationFrame()루프 사용
    //함수를 몇번이고 계속 반복해서 실행가능한 타이밍 함수사용
    //프레임 속도를 동기화하고 필요할 때만 모양을 랜더링한다.
    requestAnimationFrame(draw);
}

draw();

