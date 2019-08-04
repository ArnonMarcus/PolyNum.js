import Term from "./term.js";
import Notation from "./base.js";
import {zip} from "../../core/utils.js";


export class ExpressionTerm extends Term {
    static getForm = (form, index) => index === 0 ? '' : form;
    static getSuffix = (index) => index < 2 ? '' : super.getSuffix(index);
    static getPrefix = (value, index) => index === 0 ? value : (
        (value === 1 || value === -1) ? '' : Math.abs(value)
    );
}


export default class Expression extends Notation {
    static TERM = new ExpressionTerm();
    static DELIMITER = ' ';

    get terms() {
        const terms = [];

        for (const [o, t] of this.operators_and_terms)
            terms.push(terms.length === 0 ? (o === ' - ' ? '-' : '') : o, t);

        return terms;
    }

    get operators_and_terms() {
        if (this._polynumber.is_zero)
            return [['', `0${this._polynumber.form}°`]];

        const terms = [];
        const operators = [];

        for (const [i, v] of this._polynumber.array.entries())
            if (v !== 0) {
                operators.push(v < 0 ? ' - ' : ' + ');
                terms.push(this.getTermFor(v, i));
            }

        return zip(operators, terms);
    }
}


