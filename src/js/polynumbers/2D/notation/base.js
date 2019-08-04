import Notation from "../../1D/notation/base.js";


export default class Notation2D extends Notation {
    get body() {
        if (this._polynumber.is_row) {

        }
        const body = grid2D(
            this._polynumber.array.length,
            this._polynumber.array.max_len()
        );

        let j = 0;
        let v = '';
        let filler = '';
        for (const [i, p] of this._polynumber.array.entries()) {
            for ([j, v] of p.notation.body.entries())
                body[j][i] = v;

            if (j < height) {
                filler = ' '.repeat(row.length);
                while (j < height) {
                    j++;
                    body[i][j] = ' '.repeat(row.length);
                }
            }
        }

        return body;
    }
}