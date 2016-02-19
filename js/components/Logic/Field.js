
import InitController from './InitController';

export default class Field {

    constructor() {
        this.letters = this.getLetters();
        this.data = this.getInitState();
    }

    getData() {
        return this.data;
    }

    getLetters() {
        let letters = [];
        for(let i=97; i<105; i++) {
            letters.push(String.fromCharCode(i));
        }
        return letters;
    }

    getInitState() {
        let initController = new InitController();
        let data = new Array();

        for (let i = 7; i >= 0; i--) {
            data[i] = new Array();
            for (let j = 0; j < 8; j++) {
                data[i][j] = {
                    figure: initController.getFigureByPosition({x: j, y: i}),
                    class: (!(i%2) && !(j%2)) || (i%2 && j%2) ? 'white' : 'black'
                };
            }
        }

        return data;
	}

}