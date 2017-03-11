function mathExp(left, operator, right) {
    return {
      type: 'expression',
      value: {
        left: left.parse(),
        operator: operator.parse(),
        right: right.parse()
      }
    }
  }


module.exports = {
  variable(prefix, n) {
    return {
      type: 'variable',
      prefix: prefix.parse() || null,
      value: n.parse()
    };
  },
  AddExp_add: mathExp,
  MulExp_mul: mathExp,
  ExpExp_power: mathExp,
  PriExp_paren(head, MathExp, foot) {
    return MathExp.parse();
  },
  PriExp_neg(neg, PriExp) {
    return {
      type: 'expression',
      value: {
        left: {
          type: 'value',
          value: 0
        },
        operator: '-',
        right: PriExp.parse()
      }
    }
  },
  PriExp_pos(pos, PriExp) {
    return {
      type: 'expression',
      value: {
        left: {
          type: 'value',
          value: 0
        },
        operator: '+',
        right: PriExp.parse()
      }
    }
  }
}
