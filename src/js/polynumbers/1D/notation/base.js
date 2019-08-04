import Term from "./term.js";


export default class Notation {
    static TERM = new Term();
    static DELIMITER = '\n';

    _polynumber;

    of(polynumber) {
        this._polynumber = polynumber;

        return this;
    }

    toString = () => this.lines.join(this.constructor.DELIMITER);

    get lines() {
        return [
            this.terms.join('')
        ];
    }

    get terms() {
        return this._polynumber.array.strings();
    }

    getTermFor(value, index) {
        return this.constructor.TERM.of(
            this._polynumber.form, value, index
        ).toString();
    }

    get extended_terms() {
        return this._polynumber.array.map(
            (value, index) => this.getTermFor(value, index)
        );
    }
}