import Notation2D from "./base.js";
import {ExtendedColumnNotation} from "../../1D/notation/column.js";


export default class ColumnNotation2D extends Notation2D {

    get lines() {
        if (this.is_zero)
            return [
                '┏━┓',
                '┃0 ',
                '┗  '
            ];

        const width = this.width;
        const height = this.height;
        const co_widths = new Uint8Array(height);
        const co_strings = Array(height);
        const column_widths = new Uint8Array(width);
        const column_strings = Array(width);
        const rows = grid2D(height, width, 0);

        for (const [c, p] of this.array.entries()) {
            co_widths.fill(1);
            co_strings.fill('0');

            for (const [i, co] of p.coeff.entries()) {
                co_strings[i] = `${co}`;
                co_widths[i] = co_strings[i].length;
            }

            column_widths[c] = max(...co_widths);
            column_strings[c] = [...co_strings];
        }

        for (const [column_index, column] of column_strings.entries()) {
            for (let [row_index, string] of column.entries()) {
                for (let l = string.length; l < column_widths[column_index]; l++)
                    string += ' ';

                rows[row_index][column_index] = string;
            }
        }

        const header_length = sum(column_widths) + width - 1;
        return [
            `┏${'━'.repeat(header_length)}┓`,
            ...rows.map(row =>
                `┃${row.join(' ')} `),
            `┗${' '.repeat(header_length + 1)}`
        ]
    }
}


export class ExtendedColumnNotation2D extends ExtendedColumnNotation {

}