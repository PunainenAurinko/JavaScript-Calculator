document.addEventListener("DOMContentLoaded", function (event) {

    var keys = document.querySelectorAll('span'),
        result = document.querySelector('.result p');

    // display 0 when the calculator opens
    result.innerHTML = '0';

    for (var i = 0; i < keys.length; i += 1) {
        if (keys[i].innerHTML === '=') {
            keys[i].addEventListener('click', calculate(i));
        } else {
            keys[i].addEventListener('click', pressKey(i));
        }
    }

    function pressKey(i) {

        return function () {

            var keyPressed = keys[i].innerHTML;
            var display = result.innerHTML;

            if (result.innerHTML === '0' && keyPressed != '÷' && keyPressed != 'x' && keyPressed != '-' && keyPressed != '+' && keyPressed != '.') {
                result.innerHTML = '';
            }

            switch (keyPressed) {

            case 'c':
                result.innerHTML = '0';
                break;
            case '÷':
                // check for two in a row
                result.innerHTML += '/';
                break;
            case 'x':
                // check for two in a row
                result.innerHTML += '*';
                break;
            case '%':
                // if an operator was entered in a string
                if (result.innerHTML.indexOf(result.innerHTML.match(/[^0-9]/)) >= 1) {
                    var a = result.innerHTML.split(/[^0-9]/, 1);
                    var b = result.innerHTML.split(/[^0-9]/, 2);
                    var c = result.innerHTML.match(/[^0-9]/);
                    var percent = b + '/100*' + a;
                    result.innerHTML = a + c + eval(percent);
                    result.innerHTML = result.innerHTML.slice(0, 9);
                } else {
                    result.innerHTML = result.innerHTML;
                }
                break;
            case '±':
                // if result is negative - make it positive and vice versa
                var num = parseFloat(result.innerHTML);
                if (num < 0) {
                    result.innerHTML = num * -1;
                } else if (num > 0) {
                    result.innerHTML = num * -1;
                } else {
                    result.innerHTML = '0';
                }
                result.innerHTML = result.innerHTML.slice(0, 10);
                break;
            case '.':
                if (result.innerHTML.indexOf('.') > 0) {
                    result.innerHTML.indexOf('.') === -1;
                    break;
                }
            default:
                result.innerHTML += keyPressed;
                result.innerHTML = result.innerHTML.slice(0, 9);
            }
        };
    }

    function calculate(i) {
        return function () {
            result.innerHTML = eval(result.innerHTML);
            result.innerHTML = result.innerHTML.slice(0, 10);
        };
    }
});