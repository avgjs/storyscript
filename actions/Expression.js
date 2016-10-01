/**
 * Copyright 2016 Icemic Jia <bingfeng.web@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
  ExpressionBlock_multi(BracketExpression, booleanOperator, ExpressionBlock) {
    var leftValue = BracketExpression.parse();
    var operator = booleanOperator.parse();
    var rightValue = ExpressionBlock.parse();
    return {
      left: {
        type: 'expression',
        value: leftValue
      },
      operator: operator,
      right: {
        type: 'expression',
        value: rightValue
      }
    }
  },
  ExpressionBlock_single(BracketExpression) {
    return BracketExpression.parse();
  },
  BracketExpression_bracket(head, ExpressionBlock, foot) {
    return ExpressionBlock.parse();
  },
  BracketExpression_nonBracket(Expression) {
    return Expression.parse();
  },
  Expression_v2V(variable, operator, value) {
    return {
      left: {
        type: 'variable',
        value: variable.parse()
      },
      operator: operator.parse(),
      right: {
        type: 'value',
        value: value.parse()
      }
    }
  },
  Expression_v2v(variable, operator, variable2) {
    return {
      left: {
        type: 'variable',
        value: variable.parse()
      },
      operator: operator.parse(),
      right: {
        type: 'variable',
        value: variable2.parse()
      }
    }
  },
  Expression_v(variable) {
    return {
      left: {
        type: 'variable',
        value: variable.parse()
      },
      operator: null,
      right: null
    }
  }
}
