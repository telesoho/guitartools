const style = require('../assets/guitartools.scss');
const howler = require("howler");
const SOUND = require("../assets/Idina Menzel - Let It Go.mp3")

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
        let music = new Howl({src:[SOUND]});
        music.play();
        app.innerText = "OK";
    }
}

window.addEventListener('load', ()=>{
    let a = new Person();
    a.print();
})