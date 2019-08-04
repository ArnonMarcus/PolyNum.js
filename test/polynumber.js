import PolyNum from "../src/js/main.js";


const {PolyNumber, utils, constants} = PolyNum;
const {SIDE} = constants;
const {Sides} = utils;


const _polynumber_test_cases = {
    binary: {
        '_add': [
            [[0], [0],  [0]],
            [ 0,  [0],  [0]],
            [[0],  0,   [0]],
            [ 0,   0,   [0]],

            [[0], [1],  [1]],
            [ 0,  [1],  [1]],
            [[0],  1,   [1]],
            [ 0,   1,   [1]],

            [[1], [0],  [1]],
            [ 1,  [0],  [1]],
            [[1],  0,   [1]],
            [ 1,   0,   [1]],

            [[1], [1],  [2]],
            [ 1,  [1],  [2]],
            [[1],  1,   [2]],
            [ 1,   1,   [2]],


            [[2], [3, 4],  [5, 4]],
            [[3, 4], [2],  [5, 4]],
            [[2, 0], [3, 4],    [5, 4]],
            [[3, 4], [2, 0, 0], [5, 4]],
            [[1, -2, 5], [-4, 6, -5, 1],  [-3, 4, 0, 1]],
        ],
        '_subtract': [
            [[0], [0],  [0]],
            [ 0,  [0],  [0]],
            [[0],  0,   [0]],
            [ 0,   0,   [0]],

            [[0], [1],  [-1]],
            [ 0,  [1],  [-1]],
            [[0],  1,   [-1]],
            [ 0,   1,   [-1]],

            [[1], [0],  [1]],
            [ 1,  [0],  [1]],
            [[1],  0,   [1]],
            [ 1,   0,   [1]],

            [[1], [1],  [0]],
            [ 1,  [1],  [0]],
            [[1],  1,   [0]],
            [ 1,   1,   [0]],


            [[2], [3, 4],  [-1, -4]],
            [[3, 4], [2],  [1, 4]],
            [[2, 0], [3, 4],    [-1, -4]],
            [[3, 4], [2, 0, 0], [1, 4]],
            [[4, -7, 1], [2, 5],  [2, -12, 1]],
        ],
        '_multiply': [
            [[0], [0],  [0]],
            [ 0,  [0],  [0]],
            [[0],  0,   [0]],
            [ 0,   0,   [0]],

            [[0], [1],  [0]],
            [ 0,  [1],  [0]],
            [[0],  1,   [0]],
            [ 0,   1,   [0]],

            [[1], [0],  [0]],
            [ 1,  [0],  [0]],
            [[1],  0,   [0]],
            [ 1,   0,   [0]],

            [[1], [1],  [1]],
            [ 1,  [1],  [1]],
            [[1],  1,   [1]],
            [ 1,   1,   [1]],


            [[-1], [-1],  [1]],
            [ -1,  [-1],  [1]],
            [[-1],  -1,   [1]],
            [ -1,   -1,   [1]],

            [[-1], [1],  [-1]],
            [ -1,  [1],  [-1]],
            [[-1],  1,   [-1]],
            [ -1,   1,   [-1]],

            [[1], [-1],  [-1]],
            [ 1,  [-1],  [-1]],
            [[1],  -1,   [-1]],
            [ 1,   -1,   [-1]],

            [[1,  1],  [1, -1],  [1,  0, -1]],
            [[1,  1],  [1,  1],  [1,  2,  1]],
            [[1, -1],  [1, -1],  [1, -2,  1]],

            [[1, -1],  [1,  1, 1],  [1, 0, 0, -1]],
            [[1,  1],  [1, -1, 1],  [1, 0, 0, 1]],
            [[1, -1, 1], [1, 1, 1],  [1, 0, 1, 0, 1]],

            [[1, 1],  [1, 1, 1],  [1, 2, 2, 1]],
            [[1, 1],  [1, 1, 1, 1], [1, 2, 2, 2, 1]],
            [[1, 1, 1], [1, 1, 1],  [1, 2, 3, 2, 1]],
            [[1, -1, 1], [1, -1, 1],  [1, -2, 3, -2, 1]],

            [[-1], [5, -3],  [-5, 3]],
            [[2, -3], [4, 1, -2],  [8, -10, -7, 6]],

            [[1, 2], [3, 5],  [3, 11, 10]],
            [[1, 6], [7, 3],  [7, 45, 18]],
            [[4, 1], [3, 7],  [12, 31, 7]]
        ],
        '_divide': [
            [[0], [1],  [0]],
            // [ 0,  [1],  [0]],
            [[0],  1,   [0]],
            [ 0,   1,   [0]],

            [[1], [1],  [1]],
            // [ 1,  [1],  [1]],
            [[1],  1,   [1]],
            [ 1,   1,   [1]],


            [[-1], [-1],  [1]],
            // [ -1,  [-1],  [1]],
            [[-1],  -1,   [1]],
            [ -1,   -1,   [1]],

            [[-1], [1],  [-1]],
            // [ -1,  [1],  [-1]],
            [[-1],  1,   [-1]],
            [ -1,   1,   [-1]],

            [[1], [-1],  [-1]],
            // [ 1,  [-1],  [-1]],
            [[1],  -1,   [-1]],
            [ 1,   -1,   [-1]],

            [[12, 8, -7, -2, 1], [4, 0, -1],  [3, 2, -1]],
            [[12, 8, -7, -2, 1], [3, 2, -1],  [4, 0, -1]]
        ],
        '_raiseToPower': [
            [[0],  0,   [1]],
            [ 0,   0,   [1]],

            [[0],  1,   [0]],
            [ 0,   1,   [0]],

            [[1],  0,   [1]],
            [ 1,   0,   [1]],

            [[1],  1,   [1]],
            [ 1,   1,   [1]],


            [[-1],  -1,   [-1]],
            [ -1,   -1,   [-1]],

            [[-1],  1,   [-1]],
            [ -1,   1,   [-1]],

            [[1],  -1,   [1]],
            [ 1,   -1,   [1]],


            [[-1],  0,   [1]],
            [ -1,   0,   [1]],


            [[2],  0,   [1]],
            [ 2,   0,   [1]],

            [[0],  2,   [0]],
            [ 0,   2,   [0]],

            [[2],  2,   [4]],
            [ 2,   2,   [4]],


            [[-2],  0,   [1]],
            [ -2,   0,   [1]],

            [[2],  -2,   [0.25]],
            [ 2,   -2,   [0.25]],

            [[-2],  -2,   [0.25]],
            [ -2,   -2,   [0.25]],


            [[-2],  -1,   [-0.5]],
            [ -2,   -1,   [-0.5]],

            [[-2],  1,   [-2]],
            [ -2,   1,   [-2]],

            [[2],  -1,   [0.5]],
            [ 2,   -1,   [0.5]],

            [[2],  1,   [2]],
            [ 2,   1,   [2]],

            [[1,   1], 2,  [1,  2, 1]],
            [[1,  -1], 2,  [1, -2, 1]],
            [[-1,  1], 2,  [1, -2, 1]],
            [[-1, -1], 2,  [1,  2, 1]],

            [[ 1,  1], 3,  [ 1,  3,  3,  1]],
            [[ 1, -1], 3,  [ 1, -3,  3, -1]],
            [[-1,  1], 3,  [-1,  3, -3,  1]],
            [[-1, -1], 3,  [-1, -3, -3, -1]],

            [[1, 1, 1], 3,  [1, 3, 6, 7, 6, 3, 1]]
        ]
    },
    poly: {
        sum: [
            [[1, 2], [2, 5], [4, 3], [7, 10]]
        ],
        mul: [
            [[1, 2], [2, 5], [4, 3], [8, 42, 67, 30]],
            [[2, 3, 1], [5, 1], [4, 0, 1], [40, 68, 42, 21, 8, 1]]
        ]
    }
};

for (const [i, row] of _polynumber_test_cases.binary._add.entries()) {
    _polynumber_test_cases.poly.sum.push(row);
    if (i >= (4*4)) {
        _polynumber_test_cases.binary._subtract.push(
            [row[2], row[1], row[0]],
            [row[2], row[0], row[1]]
        );
    }
}

for (const [i, row] of _polynumber_test_cases.binary._multiply.entries()) {
    _polynumber_test_cases.poly.mul.push(row);
    if (i >= (7*4)) {
        _polynumber_test_cases.binary._divide.push(
            [row[2], row[1], row[0]],
            [row[2], row[0], row[1]]
        );
    }
}


function _testPolyNumber() {
    const start = performance.now();

    const left = new PolyNumber();
    const right = new PolyNumber();
    const expected_result = new PolyNumber();
    let result = new PolyNumber();

    const poly_right = new PolyNumber();
    const poly_arg = [];

    const side = new Sides();

    let count = 0;

    for (const func in _polynumber_test_cases.poly) {
        for (let row of _polynumber_test_cases.poly[func]) {
            row = [...row];

            side.left = row.shift();
            side.right = row.shift();
            expected_result.array = row.pop();

            poly_arg.length = 0;

            switch (side.is_number) {
                case SIDE.none: {
                    left.array = side.left;
                    right.array = side.right;
                    poly_arg.push(left, right);
                    break;
                }
                case SIDE.both: {
                    left.array = null;
                    right.array = null;
                    poly_arg.push(side.left, side.right);
                    break;
                }
                case SIDE.left: {
                    right.array = side.right;
                    left.array = null;
                    poly_arg.push(side.left, right);
                    break;
                }
                case SIDE.right: {
                    left.array = side.left;
                    right.array = null;
                    poly_arg.push(left, side.right);
                    break;
                }
            }

            if (row.length > 0) {
                poly_right.array = row.shift();
                poly_arg.push(poly_right);
            }
            // console.log(`PolyNumber.${op}(${left.array}) is ${expected_result.array}`);
            result = PolyNumber[func](poly_arg, result);

            console.assert(result.equals(expected_result),
                `PolyNumber.${func}(${poly_arg}) is ${expected_result.array} not ${result.array} !`);

            count += 1;
        }
    }

    for (const func in _polynumber_test_cases.binary) {
        for (let [l, r, e] of _polynumber_test_cases.binary[func]) {
            side.left = l;
            side.right = r;
            expected_result.array = e;

            switch (side.is_number) {
                case SIDE.none: {
                    left.array = l;
                    right.array = r;
                    result = PolyNumber[func](left, right, result);
                    break;
                }
                case SIDE.both: {
                    left.array = null;
                    right.array = null;
                    result = PolyNumber[func](l, r, result);
                    break;
                }
                case SIDE.left: {
                    right.array = r;
                    left.array = null;
                    result = PolyNumber[func](l, right, result);
                    break;
                }
                case SIDE.right: {
                    left.array = l;
                    right.array = null;
                    result = PolyNumber[func](left, r, result);
                    break;
                }
            }

            console.assert(result.equals(expected_result),
                `PolyNumber.${func}(${typeof l}: ${l}, ${typeof r}: ${r}) is ${e} not ${result.array} !`);

            // console.log(`PolyNumber.${op}(${typeof l}: ${l}, ${typeof r}: ${r}) is ${e} `);
            count += 1;
        }
    }

    console.debug(`${count} tests passed (${Math.trunc(performance.now() - start)}ms)`);
}

_testPolyNumber();
