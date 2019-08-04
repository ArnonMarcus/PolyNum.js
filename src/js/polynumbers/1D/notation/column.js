import Notation from "./base.js";


export default class ColumnNotation extends Notation {
    get height() {
        return this._polynumber.array.length + 1;
    }

    get width() {
        return this.terms.max_len() + 2;
    }

    get body() {
        const terms = this.terms;
        const max_length = terms.max_len();
        return terms.map(
            s => s
                .padEnd(s.length)
                .padStart(max_length)
        );
    }

    get lines() {
        const body = this.body;
        return [
            `┏${'━'.repeat(body[0].length)}┓`,
            ...body.map(s => ` ${s} `)
        ];
    }
}


export class ExtendedColumnNotation extends ColumnNotation {
    get terms() {
        return this.extended_terms;
    }
}