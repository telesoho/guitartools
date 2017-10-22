const style = require('../assets/guitartools.scss');

/**
 * 
 * 
 * @class Person
 */
class Person {
    /**
     * print
     * 
     * @memberof Person
     */
    print() {
        app.innerText = "OK";
    }
}

window.addEventListener('load', ()=>{
    let a = new Person();
    a.print();
})