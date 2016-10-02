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
  Exp_bool(JudgeExp, booleanOperator, Exp) {
    return {
      type: 'expression',
      value: {
        left: JudgeExp.parse(),
        operator: booleanOperator.parse(),
        right: Exp.parse()
      }
    }
  },
  JudgeExp_judge(left, operator, right) {
    return {
      type: 'expression',
      value: {
        left: left.parse(),
        operator: operator.parse(),
        right: right.parse()
      }
    }
  }
}
