// 계산기 이름 basicCalc
// 텍스트 선택 차단 [버튼], [수식, 계산결과] 
// todo 커서는 손(선택)
function initCalc() {
    console.log("계산기를 준비합니다.");
    // calcBase.body.addEventListener('click', function(e) { getInput(e) });
    calcBase.body.addEventListener('click', getInput);
    //
    var btns = document.querySelectorAll(".btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.add('disable-select');
    }

    // 입력한 수식을 수정할 수 있도록 이벤트를 걸어둔다.
    calcBase.scr.addEventListener('click', editFn);

    // 소수점 자릿수 준비
    calcBase.deciLen = 5;
}

window.onload = function () {
    initCalc();
};

// 자료
// 입력에서 전달 받은 키값을 보관한다.
// 객체 생성 후 배열에 담아서 관리
var calcBase = {
    //data: ['(','1','+','2000',')','*','4998'],
    data: [],
    calcSign: "+-*/",
    // strData: function () {
    //     return this.data.join("");
    // },
    resetData: function () {
        return this.data = [];
    },
    calcData: function () {
        return eval(this.data.join(""));
    },
    removeLastInput: function () {
        var target, len, item, itemLen;
        target = this.data;
        len = target.length;
        item = target[len - 1];
        // data에서 마지막 아이템을 가져온다.
        itemLen = item.length
        // 아이템의 길이가 1보다 크면 한씩 지우고
        if (itemLen > 1) {
            var str = item.slice(0, -1);
            target[len - 1] = str;
        } else {
            // 1이면 아이템을 삭제
            target.pop();
        }
    },
    body: document.getElementById('calc_body'),
    deciLen: 0,
    scr: document.getElementById('screen')
}

// 수식 수정
function editFn(e) {
    var item, value, newValue, idx;
    item = e.target;
    value = item.innerText;
    // 노드를 확인
    if (item.nodeName === "SPAN") {
        idx = item.dataset.idx;
        newValue = prompt(value, calcBase.data[idx]);
        calcBase.data[idx] = newValue;
        showScreen();
    }
}

// 입력
// 키값 입력을 가져온다.
// 가져온 키값은 데이터에 전달한다.
// 조건 - 최초 입력시 기호의 경우 +, -, *, / 는 무시한다.
// 숫자에 0으로 시작 방지.
// 조건 - 연산기호가 연속으로 입력되면 마지막 기호를 사용한다.
// 15자리가 넘는 경우 무시 - 한번에 11자리까지 입력
// 음수는 괄호를 사용한다.
// 기호중 괄호는 연속입력이 가능하다.
// 수정시 연산식으로 변경이 가능하며 배열에 담아 관리
// 버튼을 클릭하면 화면에 보여주기
// 연속되는 숫자 입력을 자릿수를 추가해 넣어준다.  예) 2,3,4 => 234
function getInput(e) {
    var calcBtn, dataArr, getChar, lastItem
    calcBtn = e.target;
    dataArr = calcBase.data;
    getChar = calcBtn.innerText;
    dataArrLen = dataArr.length;
    lastItem = dataArr[dataArrLen - 1];
    // 버튼이 아니면 이하 종료
    // if (calcBtn.className.indexOf('btn') > -1)
    // } else {
    //     return;
    // } 
    // 이전: class="btn"인 경우 계속 진행을 하고 btn이 아닌 경우 종료를 한다.
    // 수정: class="btn disable-select"인 경우 계속 진행을 하고 btn이 포함되지 않은 경우 종료를 한다.
    if (calcBtn.className.indexOf('btn') === -1) return;

    // (,),C,BS,1,2,3,4,5,6,7,8,9,+,-,*,/
    // 조건 - 최초 입력시 기호의 경우 *이거나, / 는 무시한다.
    //if(!dataArr.length && getChar === "+") return;
    //if(!dataArr.length && getChar === "-") return;
    //if(!dataArr.length && getChar === "*") return;
    //if(!dataArr.length && getChar === "/") return;
    if (!dataArrLen && isCalcSign(getChar)) return;

    // 조건 - 연산기호가 연속으로 입력되면 마지막 기호를 사용한다.
    // 배열의 마지막 입력 값을 가져와서 현재 입력값이 모두 기호이면 치환한다.
    if (isCalcSign(lastItem) && isCalcSign(getChar)) {
        // 치환
        dataArr[dataArrLen - 1] = getChar;
        showGetStr();
    } else if (Number.isInteger(parseInt(lastItem)) && Number.isInteger(parseInt(getChar))) {
        // 마직막에 data의 값이 숫자이고 입력한 값이 숫자이면
        // 값을 붙여준다.
        var a = lastItem.concat(getChar);
        if (dataArr[dataArrLen - 1].length < 12) {
            dataArr[dataArrLen - 1] = parseInt(a).toString();
        }
        showGetStr();
    } else if (getChar === "=") {
        showScreen(); // 저장된 수식을 계상하고 화면에 보여준다.
    } else if (getChar === "c") {
        calcBase.resetData(); // 데이터를 지운다.
        showScreen(); // 저장된 수식을 계상하고 화면에 보여준다.
    } else if (getChar === "bs") {
        calcBase.removeLastInput(); // 마지막 입력 값을 삭제
        showScreen(); // 저장된 수식을 계상하고 화면에 보여준다.
    } else {
        dataArr.push(getChar);
        showGetStr();
    }

    // 사용하지 않음. stopPropagation()은 이벤트 캡쳐링과 버블링에 있어 현재 이벤트 이후의 전파를 막습니다.
}

function isCalcSign(param) {
    // 매개변수가 연산기호이면 참 아니면 거짓 반환 - 3항연산자
    return (calcBase.calcSign.indexOf(param) > -1) ? true : false;
}


// 출력
// 자료의 값을 천단위로 화면에 출력
// 연산으로 부터 전달 받은 계산 결과를 15자 이내로 출력
// todo 입력값 선택이 가능하도록 수정 [마직막 작업]
// 입력값에 천단위 기호 추가
function showScreen() {
    showGetStr();
    // 계산을 위임
    // var n = evalStr();
    showResult(calcBase.calcData());
}

function showGetStr() {
    console.log("입력된 수식을 표현");
    // var cStr = calcBase.strData();
    var cArr = calcBase.data;
    var cStr = "";
    for (i in cArr) {
        var x = parseInt(cArr[i]);
        cStr += '<span data-idx=' + i + '>';
        // 방법1
        if (!isNaN(x)) {
            cStr += addComma(cArr[i]);
            cStr += '</span>';
            continue;
        }
        cStr += cArr[i];
        cStr += '</span>';
        // 방법2
        // if (!isNaN(x)) {
        //     cStr += addComma(cArr[i]);
        // } else {
        //     cStr += cArr[i];
        // }
    }
    // var cStr = cArr.join("");
    document.getElementById("screen").innerHTML = cStr;
}

function showResult(param) {
    // 결과를 화면에 뿌려주는 역할
    console.log("결과를 보여준다." + param);
    // 판단문 - 결과값 또는 초과 미만의 메세지를 처리
    if (param === undefined) {
        param = "";
    } else if (param > 999999999999 || param < -99999999999) {
        param = "결과가 범위를 초과하고 있습니다.";
    } else {
        param = editLimit(param);
    }

    var num, commaStr, point, pStr = "";
    if (isNaN(param) || param === "") {
        commaStr = param;
    } else {
        // 부동소수점 계산 오류 발생  12345.123 - 12345 = 0.12299999999959255
        // int = parseInt(param);
        // commaStr = addComma(int);
        // point = param - int;
        // pStr = (point === 0)?"":point.toString().slice(1); // 삼항연산자
        num = String(param); // 12345,123
        point = num.indexOf('.'); // 소숫점의 인덱스값
        if (point < 0) {
            commaStr = addComma(num); // 소수자리가 없는 경우
        } else {
            pStr = num.slice(point); // 소수부분(소숫점 포함)
            num = num.slice(0, point); // 정수부분
            commaStr = addComma(num); // 천단위 쉽표 추가
        }
    }
    document.getElementById("screen2").innerHTML = commaStr + pStr;
}

function editLimit(n) {
    // n = 123456789.12345678
    // 쉽표를 포함한 15자리 이내 숫자로 돌려준다.
    // 너무 크거나 작은 수는 '결과가 너무 큽니다.' 또는 '결과가 너무 작습니다.'라는 메세지 전달.
    var valLen, commaLen, deciLen = calcBase.deciLen;
    // deciLen=5, n = 123456789.12345678, valLen = 9
    valLen = parseInt(n).toString().length;
    // 나머지가 0보다 크면 '몫'이 천다위 쉽표의 개수이다.
    // deciLen=5, n = 123456789.12345678, valLen = 9, commaLen = 3
    commaLen = parseInt(valLen / 3);
    if (valLen > 2 && valLen % 3 === 0) {
        // 나머지가 0이면 '몫-1'이 천단위 쉽표의 개수
        // deciLen=5, n = 123456789.12345678, valLen = 9, commaLen = 2
        commaLen--;
    }
    // deciLen=5, n = 123456789.12345678, valLen = 9, commaLen = 2, avaLen = 3
    var avaLen = 15 - valLen + commaLen - 1;
    if (deciLen > avaLen) deciLen = avaLen;
    // deciLen=3, n = 123456789.12345678, valLen = 9, commaLen = 2, avaLen = 3
    // 리턴값은 123456789.123   123.34000
    return Number(n.toFixed(deciLen));
}

function addComma(num) {
    // 정수를 입력받아 천단위마다 쉼표를 추가하는 역할
    if (isNaN(num)) return false;

    var str, result, l, len, sign = "";
    str = Math.abs(num).toString();
    len = str.length;
    l = len % 3;

    result = "";
    result += str.substr(0, l);

    while (l < len) {
        if (result !== "") result += ",";
        result += str.substr(l, 3);
        l += 3
    }
    if (num < 0) sign = "-";
    return sign + result;
}



        // 연산
        // 자료에 보관된 수식을 가져와 계산
        // eval()을 사용
        // 결과는 출력에 전달한다.
        // function evalStr() {
        //     console.log("계산 결과를 보여준다.");
        //     var cStr = calcBase.strData();
        //     return eval(cStr);
        // }

