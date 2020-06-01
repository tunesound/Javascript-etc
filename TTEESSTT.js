var arr = [];
var valid = true;
var setValue = function (val) {
    var input = document.getElementById('input')
    if (input.value === "0") {
        input.value = val;
    } else {
        if (valid === false) {
            input.value = val;
            valid = true;
        } else {
            input.value += val;
        };
    };
};

var setDefault = function () {
    arr = [];
    document.getElementById('input').value = "0";
};

var getOperator = function (operator) {
    var input = document.getElementById('input');
    arr.push(input.value);
    var result = Number(arr[0]);
    for (var i = 1; i < arr.length; i++) {
        switch (arr[i]) {
            case '+':
                result += Number(arr[i + 1]);
                break;
            case '-':
                result -= Number(arr[i + 1]);
                break;
            case '*':
                result *= Number(arr[i + 1]);
                break;
            case '/':
                result /= Number(arr[i + 1]);
                break;
            case '=':
                break;
            default:
                break;
        };
    };
    input.value = result;
    arr.push(operator);
    valid = false;
};