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

let GLOBAL = {},
      SAVE = {},
      SCOPES = [];
let   CURRENTSCOPE = {};

function calculate(exp, node=0) {
  switch (exp.type) {
    case 'expression':
      const value = exp.value;
      return calc_expression(calculate(value.left), value.operator, calculate(value.right));
    case 'variable':
      return calc_variable(exp.value, exp.prefix, node);
    case 'value':
      return exp.value;
    default: throw `Unrecognized type ${type}`;
  }
}

function calc_expression(left, operator, right) {
  switch (operator) {
    case '&&': return left && right; break;
    case '||': return left || right; break;
    case '==': return left == right; break;
    case '>=': return left >= right; break;
    case '<=': return left <= right; break;
    case '>': return left > right; break;
    case '<': return left < right; break;
    case '+': return left + right; break;
    case '-': return left - right; break;
    case '*': return left * right; break;
    case '/': return left / right; break;
    case '^': return Math.pow(left, right); break;
    case '%': return left % right; break;
    default: throw `Unrecognized operator ${operator}`;
  }
}

function calc_variable(name, prefix, node) {
  switch (prefix) {
    case null: return findVariableValue(name, node); break;
    case '$': return GLOBAL[name]; break;
    case '%': return SAVE[name]; break;
    default: throw `Unrecognized prefix ${prefix}`;
  }
}

function findVariableValue(name, node=0) {
  let ret = null;
  const _SCOPES = [...SCOPES, CURRENTSCOPE];
  for (let i = _SCOPES.length - 1 - node; i > -1; i--) {
    const scope = _SCOPES[i];
    ret = scope[name] || null;
    if (ret) {
      break;
    }
  }
  return ret;
}

function assign(name, prefix, value, explicit) {
  if (prefix) {
    if (prefix === '$') {
      GLOBAL[name] = value;
    } else if (prefix === '%') {
      SAVE[name] = value;
    }
  } else if (explicit) {
    const scope = CURRENTSCOPE;
    if (scope[name]) {
      throw `Identifier '${name}' has already been declared`;
    } else {
      scope[name] = value;
    }
  } else {
    let defined = false;
    let scope = null;
    const _SCOPES = [...SCOPES, CURRENTSCOPE];
    for (let i = _SCOPES.length - 1; i > -1; i--) {
      scope = _SCOPES[i];
      if (scope.hasOwnProperty(name)) {
        defined = true;
        break;
      }
    }
    if (defined) {
      scope[name] = value;
    } else {
      throw `${name} is not defined`;
    }
  }
}

module.exports = {
  load() {
    GLOBAL = {};
    SAVE = {};
    SCOPES = [];
    CURRENTSCOPE = {};
  },
  dump() {
    return {
      GLOBAL: GLOBAL,
      SAVE: SAVE,
      SCOPES: SCOPES,
      CURRENTSCOPE: CURRENTSCOPE
    }
  },
  getGlobalScope() {
    return GLOBAL;
  },
  getSaveScope() {
    return SAVE;
  },
  getScope(node) {
    return [...SCOPES, CURRENTSCOPE][SCOPES.length - node]
  },
  setGlobalScope(scope) {
    GLOBAL = scope;
  },
  setSaveScope(scope) {
    SAVE = scope;
  },
  setScopes(scopes) {
    SCOPES = SCOPES;
    this.popScope();
  },
  pushScope(scope={}) {
    SCOPES.push(CURRENTSCOPE);
    CURRENTSCOPE = scope;
  },
  popScope() {
    CURRENTSCOPE = SCOPES.pop();
  },
  calc(exp, node) {
    return calculate(exp);
  },
  assign(name, prefix, right, explicit) {
    return assign(name, prefix, calculate(right), explicit);
  }
}
