//Variables
const OPERATIONS = ['+', '-', '*', '/', 'Enter', '%'];
let calculatorKeys = document.querySelectorAll('.calculator-key');
let displayMain = document.querySelector('#displayMain');
let displaySmall = document.querySelector('#displaySmall');
let firstNum = null;
let secondNum = null;
let result = null;
let operator = null;
let displayMainValue = '';
let displaySmallValue = '';

//Events
calculatorKeys.forEach(key => key.addEventListener('click', e => registerKeys(e.target.value)));
document.addEventListener('keydown', e => registerKeys(e.key));

//Functions
function registerKeys(key){

    //Numbers
    if(key >= 0 || key <= 9 || key == '.'){
        if(firstNum == null || operator != ''){
            addDisplayMain(key);
            addDisplaySmall(key);
        }
    }else if(OPERATIONS.includes(key)){ //Operators   
        if(key == 'Enter'){
            if(firstNum == null || displayMainValue == ''){
                return;
            }else{
                secondNum = parseFloat(displayMainValue);
                firstNum = operate(operator, firstNum, secondNum);
                displayMainValue = 0;
                displaySmallValue = 0;
                addDisplayMain(firstNum);
                addDisplaySmall(firstNum);
                displayMainValue = '';
                operator = '';
            }     
        }else{
            if(firstNum == null){
                firstNum = parseFloat(displayMainValue);
                operator = key;
                addDisplayMain(key);
                addDisplaySmall(key);
                displayMainValue = '';
            }else if(operator == ''){
                secondNum == 0;
                operator = key;
                addDisplayMain(key);
                addDisplaySmall(key);
                displayMainValue = '';
            }else{
                secondNum = parseInt(displayMainValue);
                firstNum = operate(operator, firstNum, secondNum);
                displayMainValue = 0;
                displaySmallValue = 0;
                addDisplayMain(firstNum);
                addDisplaySmall(firstNum);
                addDisplaySmall(key);
                displayMainValue = '';
                operator = key;
            }
        }
    } else if(key == '+/-' && (firstNum && secondNum) ){
        reverseSign();
    } else if(key == 'AC'){
        resetCalculator();   
    }
}

function reverseSign(){
    firstNum *= -1;
    displayMainValue = firstNum;
    displayMain.textContent = displayMainValue;
    displaySmall.textContent = displayMainValue;
}

function addDisplayMain(value){
    displayMainValue += value;
    displayMain.textContent = displayMainValue;
}

function addDisplaySmall(value){
    displaySmallValue += value;
    displaySmall.textContent = displaySmallValue;
}

function resetCalculator(){
    firstNum = null;
    secondNum = null;
    result = null;
    operator = null;
    displayMainValue = '';
    displaySmallValue = '';  
    displayMain.textContent = 0;
    displaySmall.textContent = 0;
}

/**Math Functions*/
function calcAdd(x, y){
    return (x + y);
}
function calcSubstract(x, y){
    return (x - y);
}
function calcMultiply (x, y){
    return (x * y);
}
function calcDivide (x, y){
    return (x / y);
}
function calcMod(x, y){
    return (x % y);
}
function operate (operator, x, y){
    switch (operator){
        case '+': 
            return calcAdd(x, y);
            break;

        case '-': 
            return calcSubstract(x, y);
            break;

        case '*': 
            return calcMultiply(x, y);
            break;

        case '/': 
            return calcDivide(x, y);
            break;

        case '%': 
        return calcMod(x, y);
        break;
    }
}
