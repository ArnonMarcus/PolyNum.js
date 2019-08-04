import {SUFFIXES} from "../../core/constants.js";


export default class Term {
    _form;
    _value;
    _index;

    of(form, value, index) {
        this._form = form;
        this._value = value;
        this._index = index;

        return this
    }

    toString = () => [
        this.prefix,
        this.form,
        this.suffix
    ].join('');

    get form() {
        return this.constructor.getForm(this._form, this._index)
    };

    get prefix() {
        return this.constructor.getPrefix(this._value, this._index)
    };

    get suffix() {
        return this.constructor.getSuffix(this._index)
    }

    static getSuffix(index) {
        return index in
        SUFFIXES ?
            SUFFIXES[index] :
            index
    }

    static getForm(form) {
        return form;
    }

    static getPrefix(value) {
        return value;
    }
}