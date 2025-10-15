function rekenUit(getal1, getal2, callback) {
    const som = getal1 + getal2;
    callback(som);
}

rekenUit(7, 5, (uitkomst) => {
    const verdubbeld = uitkomst * 2;
    console.log(verdubbeld);
});