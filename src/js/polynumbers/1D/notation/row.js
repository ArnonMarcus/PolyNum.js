import Notation from "./base.js";


export default class RowNotation extends Notation {
    get height() {
        return 3;
    }

    get width() {
        return 2 +
            this.terms.length +
            this._polynumber.array.length;
    }

    get lines() {
        const body = this.terms.join(' ');
        const filler = ' '.repeat(body.length + 2);
        return [
            `┏${filler}`,
            `┃${body} )`,
            `┗${filler}`
        ];
    }

}


export class ExtendedRowNotation extends RowNotation {
    get terms() {
        return this.extended_terms
    }
}