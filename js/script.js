document.addEventListener("DOMContentLoaded", function (event) {

    var keys = document.getElementsByTagName('span'),
        result = document.querySelector('.result p');

    result.innerHTML = '0';

    for (var i = 0; i < keys.length; i += 1) {
        if (keys[i].innerHTML === '=') {
            keys[i].addEventListener('click', calculate(i));
        } else {
            keys[i].addEventListener('click', addValue(i));
        }
    }

    function addValue(i) {

        return function () {

            var keyPressed = keys[i].innerHTML;

            if (result.innerHTML === '0' && keyPressed != '÷' && keyPressed != 'x' && keyPressed != '+' && keyPressed != '.') {
                result.innerHTML = '';
            }


            switch (keyPressed) {

            case 'c':
                result.innerHTML = '0';
                break;
            case '÷':
                result.innerHTML += '/';
                break;
            case 'x':
                result.innerHTML += '*';
                break;
            case '%':
                //  if there is a /[^0-9]/ match in the string do this:
                var a = result.innerHTML.split(/[^0-9]/, 1);
                var b = result.innerHTML.split(/[^0-9]/, 2);
                var c = result.innerHTML.match(/[^0-9]/);
                var percent = b + '/100*' + a;
                result.innerHTML = a + c + eval(percent);
                //  else, do this:    
                break;
            case '.':
                if (result.innerHTML.indexOf('.') > 0) {
                    result.innerHTML.indexOf('.') === -1;
                    break;
                }
            case '±':
                // if result is positive - make it negative
                var num = parseInt(result.innerHTML);
                if (num < 0) {
                    result.innerHTML = num * -1;
                } else if (num > 0) {
                    result.innerHTML = num * -1;
                } else {
                    result.innerHTML = '0';
                }
                // if result is negative - make it positive
                result.innerHTML = result.innerHTML.slice(0, 17);
                break;
            default:
                result.innerHTML += keyPressed;
                result.innerHTML = result.innerHTML.slice(0, 17);
            }
        };
    }

    function calculate(i) {
        return function () {
            result.innerHTML = eval(result.innerHTML);
            result.innerHTML = result.innerHTML.slice(0, 17);
        };
    }
});