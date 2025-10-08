let globalVar = 10;


function modifyVar() {
    let localVar = 5;
    let innerVar = 2;

    console.log(`${localVar} ${innerVar} ${globalVar}`)
}

modifyVar()
console.log(`${localVar} ${innerVar} ${globalVar}`)

// de verschillen in de scope komen doordat er 2 variabelen binnen de scope staan en buiten die functie kan je niet bij die variabelen.

