module.exports = {
  variable(n) {
    return {
      type: 'variable',
      value: n.parse()
    };
  },
  MathExp_math(left, operator, right) {
    return {
      type: 'expression',
      value: {
        left: left.parse(),
        operator: operator.parse(),
        right: right.parse()
      }
    }
  },
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
