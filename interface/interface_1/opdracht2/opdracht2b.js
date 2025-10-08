let globalVar = 10;


const myObject = {
    value: 5,

    regularFunction() {
        console.log(this.value)
    },
    arrowFunction: () => {
        console.log("arrowFunction: this.value =", this.value); // undefined
        console.log("arrowFunction: globalVar =", globalVar);
    }
}
    
myObject.regularFunction()
myObject.arrowFunction()