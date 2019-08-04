import {Sides} from "../../core/utils.js";
import PolyNumber from "../../1D/polynumber/base.js";
import Expression2D from "../notation/expression.js";
import {ORIENTATION, SIDE} from "../../core/constants.js";
import RowNotation2D, {ExtendedRowNotation2D} from "../notation/row_major.js";
import ColumnNotation2D, {ExtendedColumnNotation2D} from "../notation/column_major.js";


export default class BiPolyNumber extends PolyNumber {
    static FORMS = [['x', 'y'], ['y', 'x']];
    static EXPRESSION = new Expression2D();
    static NOTATION = [new ColumnNotation2D(), new RowNotation2D()];
    static EXTENDED = [new ExtendedColumnNotation2D(), new ExtendedRowNotation2D()];
    static POLYNUMBER = new PolyNumber();

    static zero() {return [0]};
    static fromRowAndColumn(row, column) {
        column = column instanceof PolyNumber ? column.array : column;
        row = row instanceof PolyNumber ? row.array : row;
        if (column.length === 0) column.push(0);
        if (row.length === 0) row.push(0);

        const columns = [[...column]];
        columns.length = row.length;

        for (const [i, co] of row.entries()) {
            if (i === 0)
                columns[i][0] += co;
            else
                columns[i] = [co];
        }

        return new BiPolyNumber(columns);
    }

    at(index) {
        const p = this.constructor.POLYNUMBER;
        p.orientation = this.orientation;
        p.array = this.array[index];
    }

    get height() {return this.is_row ? this.array.max_len() : this.array.length}
    get width() {return this.is_column ? this.array.max_len() : this.array.length}

    toString() {return this.expression};
    get expression() {return merge(this.terms).join('')}
    get terms() {
        if (this.is_zero)
            return [[''], [`0${this.variable}°`]];

        const terms = Array(this.coeff.length).fill('');
        const operators = Array(this.coeff.length).fill(' + ');

        for (let [i, coefficient] of this.coeff.entries) {
            if (coefficient !== 0) {
                if (coefficient < 0) {
                    operators[i] = ' - ';
                    coefficient *= -1;
                }

                terms[i] = [
                    coefficient === 1 ? '' : coefficient,
                    i === 0 ? '' : this.variable,
                    i in EXPRESSION_SUFFIXES ? EXPRESSION_SUFFIXES[i] : i
                ].join('');
            }
        }

        return [operators, terms];
    }

    get msc() {
        return {
            x: this.row_degrees.reverse().indexOf(this.degX),
            y: this.column_degrees.reverse().indexOf(this.degY)
        };
    };

    get rows() {
        return this.is_row ? this.array : [...this.array].transpose();
    }

    get columns() {
        return this.is_column ? this.array : [...this.array].transpose();
    }

    get degX() {return max(...this.row_degrees)}
    get degY() {return max(...this.column_degrees)}
    get deg() {
        if (!this.is_zero)
            return this.array.length === 1 ?
                {x: 0,         y: this.at(0).deg} :
                {x: this.degX, y: this.degY};
    }

    copy = () => new this.constructor(this.array.deep_copy(), orientation=this.orientation);
    equals(other) {
        if (!(other instanceof this.constructor) ||
            this.array.length !== other.array.length ||
            this.orientation !== other.orientation)
            return false;

        for (const [i, x] of this.array.entries())
            if (!this.at(i).equals(other.at(c)))
                return false;

        return true;
    }

    iclr() {
        this.array.length = 1;
        this.array[0].length = 1;
        return this;
    }
    static _replace(other, replaced=new this(), deep_copy=true) {
        if (Object.is(other, replaced))
            return other;

        if (other instanceof this) {
            replaced.orientation = other.orientation;
            other = other.array;
        }

        if (Array.isArray(other)) {
            replaced.array.length = other.length;
            for (const [i, x] of other.entries())
                replaced.array[i] = deep_copy ? [...x] : x;
        }

        if (typeof other === 'number') {
            replaced.iclr();
            replaced.array[0][0] = other;
        }

        return replaced;
    }

    static _inverse(bi_polynumber, inverted=new this()) {
        this._replace(bi_polynumber, inverted, Object.is(bi_polynumber, inverted))

        for (const x of inverted.array)
            for (const i of x.keys())
                x[i] *= -1;

        inverted.orientation = bi_polynumber.orientation;
        return inverted;
    }

    ishf = (offset_x=0, offset_y=0) => this.constructor._shift(this, offset_x, offset_y, this);
    shiftedBy = (offset_x=0, offset_y=0) => this.constructor._shift(this, offset_x, offset_y);
    static _shift(bi_polynumber, offset_x=0, offset_y=0, shifted=new this()) {
        if (bi_polynumber.is_zero) return shifted.iclr();

        shifted.irep(bi_polynumber);

        if (offset_x > 0) {
            const height = bi_polynumber.height;
            for (let i = 0; i < offset_x; i++)
                shifted.array.unshift([].zeros(height));
        }

        if (offset_x < 0) {
            offset_x *= -1;
            for (let i = 0; i < offset_x; i++)
                shifted.array.shift();
        }

        if (offset_y !== 0) {
            for (const i of shifted.array.keys())
                shifted.at(i).ishf(offset_y);
        }

        shifted.orientation = bi_polynumber.orientation;
        return shifted;
    }
    get is_shifter() {
        if (this.at(0).is_shifter) {
            if (this.array.length === 1)
                return true;

            const array = this.array.deep_copy();
            array.shift();
            array.transpose();
            this.constructor.POLYNUMBER.array = array[0];
            if (this.constructor.POLYNUMBER.is_shifter) {
                if (array.length === 1)
                    return true;

                array.shift();
                if (array.is_zero)
                    return true;
            }
        }

        return false;
    }

    static _transpose(bi_polynumber, transposed=new this()) {
        transposed.orientation = bi_polynumber.is_row ? ORIENTATION.COLUMN : ORIENTATION.ROW;
        transposed.array = bi_polynumber.array.deep_copy();
        transposed.array.transpose();

        return transposed;
    }

    static _translate(bi_polynumber, amount, translated=new this()) {
        translated.irep(bi_polynumber);

        if (amount !== 0)
            for (const i of translated.array.keys()) {
                const x = bi_polynumber.at(i);
                const deg = x.deg;
                if (deg === undefined)
                    x.array[0] = amount;
                else
                    for (let i = 0; i <= deg; i++)
                        x.array[i] += amount;
            }

        return translated;
    }

    static _scale(bi_polynumber, factor, scaled=new this()) {
        scaled.irep(bi_polynumber);

        if (factor === 0 || bi_polynumber.is_zero) return scaled.iclr();
        if (factor === 1) return scaled;
        if (factor === -1) return this._inverse(bi_polynumber, scaled);

        for (const i of scaled.array.keys())
            scaled.at(i).iscl(factor);

        return scaled;
    }

    static _add(left, right, added=new this()) {
        added.orientation = left.orientation;

        const side = new Sides(left, right);
        switch (side.is_number) {
            case SIDE.left: return this._translate(right, left, added);
            case SIDE.right: return this._translate(left, right, added);
            case SIDE.both: return added.irep(left + right);
        }

        switch (side.is_zero) {
            case SIDE.both: return added.iclr();
            case SIDE.right: return added.irep(left);
            case SIDE.left: return added.irep(right);
        }

        const width = new Sides(left.width - 1, right.width - 1);
        for (let i = 0; i <= width.max; i++)
            switch (width.lessThan(i)) {
                case SIDE.both:
                    added.at(i).irep(
                        left.array[i]
                    ).iadd(
                        right.array[i]
                    );
                    break;
                case SIDE.left:
                    if (!Object.is(added, left))
                        added.at(i).irep(left.array[i]);
                    break;
                case SIDE.right:
                    if (!Object.is(added, right))
                        added.at(i).irep(right.array[i]);
            }

        added.orientation = left.orientation;
        return added;
    }
    static sum(bi_polynumbers, sum=new this()) {
        bi_polynumbers = bi_polynumbers.filter(p => p instanceof BiPolyNumber && !p.is_zero);
        if (bi_polynumbers.length === 0)
            return sum.iclr();

        if (bi_polynumbers.length === 1)
            return sum.irep(bi_polynumbers[0]);

        sum.orientation = bi_polynumbers[0].orientation;
        sum.iclr();

        const width = bi_polynumbers.max_wdt;
        const height = bi_polynumbers.max_hgt;
        const empty = sum.array[0].zeros(height);

        sum.array.length = width;

        for (let c = 1; c < width; c++)
            sum.array[c] = [...empty];

        for (const bi_polynumber of bi_polynumbers)
            for (const [i, x] of bi_polynumber.array)
                for (const [j, y] of x.entries())
                    sum.array[i][j] += y;

        return sum;
    }

    static _subtract(left, right, subtracted=new this()) {
        const side = new Sides(left, right);
        switch (side.is_number) {
            case SIDE.both: return subtracted.irep(left - right);
            case SIDE.left: return subtracted.irep(left).isub(right);
            case SIDE.right: return this._translate(left, -right, subtracted);
        }

        switch (side.is_zero) {
            case SIDE.both: return subtracted.iclr();
            case SIDE.right: return subtracted.irep(left);
            case SIDE.left: return subtracted.irep(right).iinv();
        }

        const width = new Sides(left.width - 1, right.width - 1);
        for (let i = 0; i <= width.max; i++)
            switch (width.lessThan(i)) {
                case SIDE.both:
                    subtracted.at(i).irep(
                        left.array[i]
                    ).isub(
                        right.array[i]
                    );
                    break;
                case SIDE.left:
                    if (!Object.is(subtracted, left))
                        subtracted.at(i).irep(left.array[i]);
                    break;
                case SIDE.right:
                    subtracted.at(i).irep(right.at(i).inverted);
            }

        return subtracted;
    }

    static _multiply(left, right, product=new this()) {
        const number = new Sides(
            typeof left === 'number',
            typeof right === 'number'
        );
        switch (number.is) {
            case SIDE.left: return this._scale(right, left, product);
            case SIDE.right: return this._scale(left, right, product);
            case SIDE.both: return product.irep(left * right);
        }

        const deg = new Sides(left.deg, right.deg);
        if (deg.is_undefined !== SIDE.none)
            return product.iclr();

        const shifter = new Sides(left.is_shifter, right.is_shifter);
        switch (shifter.is) {
            case SIDE.left: return product.irep(right).ishf(deg.left.x, deg.left.y);
            // case SIDE.both: return product.irep(left).ishf(deg.right.x, deg.right.y);
            case SIDE.right: return product.irep(left).ishf(deg.right.x, deg.right.y);
        }

        const columns = [];
        for (const column of left.array)
            columns.push(Object.is(left, product) ? [...column.co] : column.co);

        product.iclr();

        for (const [x, column] of columns.entries())
            for (const [y, co] of column.entries())
                if (co !== 0)
                    product.iadd(right.scaledBy(co).ishf(x, y));

        return product;
    }
    static mul(factors, product=null) {
        if (factors.length === 0)
            return;

        if (!(product instanceof this))
            product = new this();

        if (factors.length === 1)
            return product.irep(factors[0]);

        const degrees = factors.map(p => p.deg);
        if (degrees.includes(undefined))
            return product.iclr();

        const product_paths = this._getProductPaths(degrees);
        product.array.length = product_paths.length;

        const column = [];
        const values = [];
        const results = [];

        for (const [x, y_paths] of product_paths.entries()) {
            column.length = y_paths.length;

            for (const [y, paths] of y_paths.entries()) {
                results.length = paths.length;

                for (const [i, path] of paths.entries()) {
                    for (const [f, [fx, fy]] of path.entries())
                        values.push(factors[f].array[fx].coeff[fy]);

                    results[i] = mul(values);
                }

                column[y] += sum(results);
            }

            product.array[x] = new PolyNumber(column);
        }

        return product;
    }

    over = (other) => this.constructor._divide(this, other);
    idiv = (other) => this.constructor._divide(this, other, this);
    static _divide(dividend, divisor, quotient=null) {
        if (divisor === 0 || divisor.is_zero)
            throw `Division by zero!`;

        if (!(quotient instanceof this))
            quotient = new this();

        const number = new Sides(
            typeof dividend === 'number',
            typeof divisor === 'number'
        );
        switch (number.is) {
            case SIDE.left: throw 'Number/PolyNumber division!!';
            case SIDE.right: return this._scale(dividend, (1.0 / divisor), quotient);
            case SIDE.both: return quotient.irep(dividend / divisor);
        }

        const deg = new Sides(dividend.deg, divisor.deg);
        switch (deg.is_undefined) {
            case SIDE.left: return quotient.iclr();
            case SIDE.right: throw `Division by zero!`;
            case SIDE.both: throw `Division by zero!`;
        }

        if (deg.right.x === 0 && deg.right.y === 0 && deg.left.x === 0 && deg.left.y === 0)
            return quotient.irep(dividend.array[0].coeff[0] / divisor.array[0].coeff[0]);

        const shifter = new Sides(dividend.is_shifter, divisor.is_shifter);
        switch (shifter.is) {
            case SIDE.left: return quotient.irep(divisor).ishf(-deg.left.x, -deg.left.y);
            case SIDE.both: return quotient.irep(dividend).ishf(-deg.right.x, -deg.right.y);
            case SIDE.right: return quotient.irep(dividend).ishf(-deg.right.x, -deg.right.y);
        }

        const remainder = dividend.copy();
        quotient.iclr();

        const temp = new PolyNumber();
        const denominator_msc = divisor.msc;

        let factor;
        let offset_x = deg.left.x - deg.right.x;
        let offset_y = deg.left.y - deg.right.y;

        while (offset_x >= 0 && offset_y >= 0) {
            factor = remainder.msc / denominator_msc;
            quotient.iadd(temp.irep(factor).ishf(offset_x, offset_y));
            remainder.isub(temp.irep(divisor).iscl(factor).ishf(offset_x, offset_y));
            if (remainder.is_zero) {
                remainder.iclr();
                break;
            }

            offset_x = remainder.deg.x - deg.right.x;
            offset_y = remainder.deg.x - deg.right.y;
        }

        return [quotient, remainder];
    }

    cubed = () => this.pow(3);
    squared = () => this.pow(2);
    pow = (exponent) => this.constructor._raiseToPower(this, exponent);
    ipow = (exponent) => this.constructor._raiseToPower(this, exponent, this);
    static _raiseToPower(bi_polynumber, exponent, product=null) {
        if (!(product instanceof this))
            product = new this();

        switch (exponent) {
            case 0: return product.irep(1);
            case 1: return product.irep(bi_polynumber);
        }

        product.irep(bi_polynumber);
        for (let e = 1; e < exponent; e++)
            product.imul(bi_polynumber);

        return product;
    }

    // evaluatedAt(num) {
    //     switch (this.deg) {
    //         case DEGREE.Undefined: return 0;
    //         case DEGREE.Number: return this.array[0];
    //         case DEGREE.Linear: return this.array[0] + this.array[1] * num;
    //     }
    //
    //     let result = this.array[0] + this.array[1] * num;
    //     for (const i = 2; i <= this.deg; i++)
    //         result += this.array[i] * pow(num, i);
    //
    //     return result;
    // }
    //
    // evaluatedToZero() {
    //     switch (this.deg) {
    //         case DEGREE.Linear: return -this.array[0] / this.array[1];
    //         case DEGREE.Quadratic: {
    //             const a = this.array[2];
    //             const b = this.array[1];
    //             const c = this.array[0];
    //
    //             const two_a = 2 * a;
    //             const sqrt_of__b_squared_minus_4ac = sqrt(sqr(b) - 4*a*c);
    //
    //             return [
    //                 (-b + sqrt_of__b_squared_minus_4ac) / two_a,
    //                 (-b - sqrt_of__b_squared_minus_4ac) / two_a
    //             ];
    //         }
    //     }
    // }
    static _sumDegrees(degrees) {
        const result = {x: 0, y: 0};

        for (const degree of degrees) {
            result.x += degree.x;
            result.y += degree.y;
        }

        return result;
    }
    static _getProductPaths(factor_degrees) {
        const deg = this._sumDegrees(factor_degrees);
        const x_path = Array(factor_degrees.length);
        const y_path = Array(factor_degrees.length);
        const paths = grid3D(deg.x + 1, deg.y + 1, 0);
        const last = factor_degrees.length - 1;

        function findProductPath(f) {
            const f_deg = factor_degrees[f];
            let x;
            let y;

            for (let fx = 0; fx <= f_deg.x; fx++) {
                for (let fy = 0; fy <= f_deg.y; fy++) {
                    x_path[f] = fx;
                    y_path[f] = fy;

                    if (f === last) {
                        x = sum(x_path);
                        y = sum(y_path);
                        if (x <= deg.x && y <= deg.y)
                            paths[x][y].push(zip(x_path, y_path));
                    } else
                        findProductPath(f + 1);
                }
            }
        }
        findProductPath(0);

        return paths;
    }
}



export const B = (...array) => new BiPolyNumber(array);