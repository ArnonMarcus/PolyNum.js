export const FORM = [
    'α',
    'β'
];


export const VARS = [
    'x',
    'y',
    'z'
];


export const SUFFIXES = [
    '⁰',
    '¹',
    '²',
    '³',
    '⁴',
    '⁵',
    '⁶',
    '⁷',
    '⁸',
    '⁹'
];


export const BINARY_OPS = {
    '+': 'iadd',
    '-': 'isub',
    'x': 'imul',
    '/': 'idiv',
    '^': 'ipow',
    '<': 'irep',
    '>': 'ishf',
    '|': 'itrl',
    '*': 'iscl',
    '~': 'equals'
};


export const UNARY_OPS = {
    '!': 'iinv',
    '%': 'itrp',
    '0': 'iclr',
    '1': 'copy',
    '2': 'isqr',
    '3': 'icub'
};


export const ORIENTATION = {
    COLUMN: 0,
    ROW: 1
};


export const DEGREE = {
    Undefined: undefined,
    Number: 0,
    Linear: 1,
    Quadratic: 2,
    Cubic: 3
};


export const SIDE = {
    none: 0,
    left: 1,
    right: 2,
    both: 3
};
