function wachtEnVoerUit(ms, callback) {
    if (typeof ms !== 'number' || typeof callback !== 'function') {
        throw new TypeError('Verwacht ms:number en callback:function');
    }
    setTimeout(callback, ms);
}

wachtEnVoerUit(2000, () => {
    console.log('Klaar met wachten!');
});