import {zip} from "../../core/utils.js";
import Expression, {ExpressionTerm} from "../../1D/notation/expression.js";


export class ExpressionTerm2D extends ExpressionTerm {
    toString = _ => [
        this.constructor.getPrefix(this._value, this._index[0]),
        this.constructor.getForm(this._form[0], this._index[0]),
        this.constructor.getSuffix(this._index[0]),
        this.constructor.getForm(this._form[1], this._index[1]),
        this.constructor.getSuffix(this._index[1])
    ].join('');
}


export default class Expression2D extends Expression {
    static T = new ExpressionTerm2D();

    get operators_and_terms() {
        if (this._polynumber.is_zero)
            return [['', `0${this._polynumber.form[0]}°${this._polynumber.form[1]}°`]];

        const terms = [];
        const operators = [];

        for (const [i, p] of this._polynumber.array.entries())
            for (const [j, v] of p.array.entries())
                if (v !== 0) {
                    operators.push(v < 0 ? ' - ' : ' + ');
                    terms.push(this.getTermFor(v, [i, j]));
                }

        return zip(operators, terms);
    }
}
