"use strict";

let CA = {}; // CALC APP

CA.history = document.querySelector("#history");

CA.output = document.querySelector("#output");

CA.nums = document.querySelectorAll(".num");

for(let i = 0;i<CA.nums.length;i++){
    CA.nums[i].addEventListener("click", () => {
        if(CA.output.textContent === "0" || CA.output.textContent === "Error") CA.output.textContent = "";
        CA.output.textContent += CA.nums[i].textContent;
    })
}

function hasDeci(string){
    for(let i = string.length; i >= 0 ; i--){
        switch(string[i]){
            case '.':
                return true;
            case '+':case '-':case '*':case '/':case '^':
                return false;
        }
    }
    return false;
}

document.querySelector("#dec").addEventListener("click", () => {
    if(!hasDeci(CA.output.textContent)){
        CA.output.textContent += '.';
    }
});

CA.ops = document.querySelectorAll(".op");

for(let i = 0;i<CA.ops.length;i++){
    CA.ops[i].addEventListener("click", () => {
        let lastc = CA.output.textContent.charAt(CA.output.textContent.length - 1);

        switch(lastc){
            case '.':
                let seclc = parseInt(CA.output.textContent.charAt(CA.output.textContent.length - 2));

                if(typeof(seclc) === 'number' && !isNaN(seclc)){
                    CA.output.textContent += CA.ops[i].textContent;
                }

                break;
            case '+':case '-':case '*':case '/':case '^':
                CA.output.textContent = CA.output.textContent.slice(0, -1) + CA.ops[i].textContent;
                break;
            default:
                CA.output.textContent += CA.ops[i].textContent;
                break;
        }    
    });
}

function space(string){
    let result = "";
    for(let i = 0; i < string.length; i++){
        switch(string[i]){
            case '+':case '-':case '*':case '/':
                result += " " + string[i] + " ";
                break;
            default:
                result += string[i];
                break;
        }

    }
    return result;
}

document.querySelector("#equal").addEventListener("click", () => {
    if(CA.output.textContent != "Error"){
        try {
            CA.history.textContent = space(CA.output.textContent) + ' =';
            CA.output.textContent = eval(CA.output.textContent.replaceAll("^", "**"));
        }
        catch(e){
            CA.output.textContent = "Error";
        }
    }
});

document.querySelector("#back").addEventListener("click", () => {
    if(CA.output.textContent.length !== 1 && CA.output.textContent[0] !== '0'){
        CA.output.textContent = CA.output.textContent.slice(0, -1);
    }
    else CA.output.textContent = '0';
});

document.querySelector("#clear").addEventListener("click", () => {
    CA.output.textContent = "0";
});

document.querySelector("#lpara").addEventListener("click", () => {
    if(CA.output.textContent === "0" || CA.output.textContent === "Error") CA.output.textContent = "";
    CA.output.textContent += "(";
});

function charFreq(string, chara){
    let freq = 0;
    for(let i = 0; i < string.length; i++){
        if(string[i] === chara) freq++;
    }
    return freq;
}

document.querySelector("#rpara").addEventListener("click", () => {
    if(charFreq(CA.output.textContent, "(") > charFreq(CA.output.textContent, ")")){
        CA.output.textContent += ")";
    }
});