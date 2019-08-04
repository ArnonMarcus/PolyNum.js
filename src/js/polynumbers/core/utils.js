import {ORIENTATION, SIDE} from "./constants.js";


export const abs = Math.abs;
export const max = Math.max;
export const min = Math.min;
export const pow = Math.pow;
export const sqr = (x) => x * x;
export const mul = (a, b) => a * b;
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;
export const div = (a, b) => a / b;
export const str = (x) => `${x}`;
export const deg = (x) => x.deg;
export const hgt = (x) => x.height;
export const wdt = (x) => x.width;
export const pol = (x) => x.hasOwnProperty('array');
export const len = (x) => x.hasOwnProperty('array') ? x.array.length : x.length;
export const zer = (x) => x.hasOwnProperty('is_zero') ? x.is_zero : x === 0;
export const sum = (...arr) => arr.sum();
export const prd = (...arr) => arr.prd();
export const zip = (...arr) => {
    const zipped = Array(arr.max_len());
    for (let i of zipped.keys())
        zipped[i] = Array(arr.length);

    return arr.reduce(zipper, zipped);
};

export function zipper(r, a, n) {
    for (const [i, v] of a.entries())
        r[i][n] = v;

    return r;
}

export function grid2D(width = 1, height = 1, fill = null, grid = []) {
    grid.length = width;

    let item;
    for (let i of grid.keys()) {
        item = [];
        item.length = height;

        grid[i] = item;
        if (fill !== null)
            item.fill(fill);
    }

    return grid;
}

export function grid3D(width = 1, height = 1, depth = 1, fill = null, grid = []) {
    grid.length = depth;

    for (let i of grid.keys())
        grid[i] = grid2D(width, height, fill);

    return grid;
}

export function factorsOf(n) {
    const results = [[1, n]];

    for (let i = 2; i <= n / 2; i++) {
        let x = findFactors(n, i, i - 1, results);
        while (x > 0) x = findFactors(n, i, x - 1, results);
    }

    return results;
}

export function findFactors(x, n, k, results) {
    let i = k;
    let prod = n;
    let result = [];

    result.push(n);
    while (i > 1) {
        if (prod * i === x) {
            prod = prod * i;
            result.push(i);
            results.push(result);
            return i;
        } else if (prod * i < x) {
            prod = prod * i;
            result.push(i);
        } else i--;
    }

    return k;
}

export class Sides {
    left;
    right;

    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    lessThan(value) {
        switch (this.is_undefined) {
            case SIDE.both:
                return SIDE.none;
            case SIDE.left:
                return value > this.right ? SIDE.none : SIDE.right;
            case SIDE.right:
                return value > this.left ? SIDE.none : SIDE.left;
        }

        if (this.right === this.left)
            return value > this.left ? SIDE.none : SIDE.both;

        if (value > this.left) return SIDE.right;
        if (value > this.right) return SIDE.left;
        return SIDE.both;
    }

    get is_greater() {
        return this.right === this.left ? SIDE.none : (
            this.right > this.left ? SIDE.right : SIDE.left
        )
    }

    get row_column() {
        return this.left.is_row && this.right.is_column
    }

    get column_row() {
        return this.left.is_column && this.right.is_row
    }

    get is_undefined() {
        return this._map(this.constructor._maps.is_undefined).is_true
    }

    get is_shifter() {
        return this._map(this.constructor._maps.is_shifter).is_true
    }

    get is_scalar() {
        return this._map(this.constructor._maps.is_scalar).is_true
    }

    get is_number() {
        return this._map(this.constructor._maps.is_number).is_true
    }

    get is_empty() {
        return this._map(this.constructor._maps.is_empty).is_true
    }

    get is_zero() {
        return this._map(this.constructor._maps.is_zero).is_true
    }

    get is_row() {
        return this._map(this.constructor._maps.is_row).is_true
    }

    get is_column() {
        return this._map(this.constructor._maps.is_column).is_true
    }

    get is_true() {
        if (this.right && this.left) return SIDE.both;
        if (this.right && !this.left) return SIDE.right;
        if (!this.right && this.left) return SIDE.left;
        if (!this.right && !this.left) return SIDE.none;
    }

    get deg() {
        return this._map(this.constructor._maps.degree)
    }

    get max() {
        switch (this.is_undefined) {
            case SIDE.both:
                return undefined;
            case SIDE.left:
                return this.right;
            case SIDE.right:
                return this.left;
        }

        return max(this.left, this.right);
    }

    _map = (func) => new Sides(func(this.left), func(this.right));
    static _maps = {
        degree: (x) => x.deg,
        is_scalar: (x) => x.deg === 0,
        is_number: (x) => typeof x === 'number',
        is_zero: zer,
        is_shifter: (x) => 'is_shifter' in x && x.is_shifter,
        is_undefined: (x) => x === undefined,
        is_empty: (x) => x.length === 0,
        is_column: (x) => x.orientation === ORIENTATION.COLUMN,
        is_row: (x) => x.orientation === ORIENTATION.ROW
    };
}


Array.prototype.min = function () {return min(...this)};
Array.prototype.max = function () {return max(...this)};
Array.prototype.sum = function () {return this.reduce(add, 0)};
Array.prototype.prd = function () {return this.reduce(mul, 1)};

Array.prototype.lengths = function () {return this.map(len)};
Array.prototype.min_len = function () {return this.lengths().min()};
Array.prototype.max_len = function () {return this.lengths().max()};
Array.prototype.sum_len = function () {return this.lengths().sum()};

Array.prototype.heights = function () {return this.map(hgt)};
Array.prototype.min_hgt = function () {return this.heights().min()};
Array.prototype.max_hgt = function () {return this.heights().max()};
Array.prototype.sum_hgt = function () {return this.heights().sum()};

Array.prototype.widths = function () {return this.map(wdt)};
Array.prototype.min_wdt = function () {return this.widths().min()};
Array.prototype.max_wdt = function () {return this.widths().max()};
Array.prototype.sum_wdt = function () {return this.widths().sum()};

Array.prototype.degrees = function () {return this.map(deg)};
Array.prototype.min_deg = function () {return this.degrees().min()};
Array.prototype.max_deg = function () {return this.degrees().max()};
Array.prototype.sum_deg = function () {return this.degrees().sum()};

Array.prototype.strings = function () {return this.map(str)};
Array.prototype.min_str = function () {return this.strings().min()};
Array.prototype.max_str = function () {return this.strings().max()};
Array.prototype.sum_str = function (d='') {return this.strings().join(d)};

Array.prototype.clear = function () {this.length = 0; return this};
Array.prototype.zero = function () {this.clear()[0] = 0; return this};
Array.prototype.zeros = function (n=null) {if (n !== null) this.length = n; this.fill(0); return this};
Array.prototype.is_zero = function (to=null) {return (to === null ? this : this.slice(0, to)).every(zer)};

Array.prototype.deep_copy = function () {
    return this.map((x) => [...x]);
};
Array.prototype.transpose = function() {
    const current = [...this];
    const height = current.max_len();
    this.length = height;

    for (const i of this.keys()) {
        this[i] = Array(height).fill(0);

        for (let [j, c] of current.entries())
            if (i < c.length)
                this[i][j] = c[i];
    }

    return this;
};
