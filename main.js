//DOM Selection
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols,
}

//Generate check value
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;
  
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//Copy password to clipboard
clipboardEl.addEventListener('click' , () =>{
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password copied to clipboard')
})


//Generate Password Function
function generatePassword(lower, upper, number, symbol, length){
    //1. init pw var
    //2. filter out unchecked types
    //3. Loop over length call generator function for each
    //4. Add final pw to the pw var and return

    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    // console.log(typesCount)

    const typesArr = [ {lower}, {upper}, {number}, {symbol} ].filter(item => Object.values(item)[0] ); 

  
    // console.log(typesArr)
    
    if(typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log(funcName)

            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}



//Generator function
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[(Math.floor(Math.random() * symbols.length))];
}


