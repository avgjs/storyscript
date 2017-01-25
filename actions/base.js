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

function parseSignedHexNumber(string) {
  const char = string[0];
  if (char === '-') {
    return - Number(string.substr(1));
  } else {
    return Number(string.substr(1));
  }
}

module.exports = {
  value(n) {
    var value;
    switch (n.ctorName) {
      case 'string': value = n.parse(); break;
      case 'number': value = Number(n.parse()) || parseSignedHexNumber(n.parse()); break;
      case 'boolean': value = (n.parse().toLowerCase() === 'true'); break;
      case 'array': value = n.parse(); break;
      default: value = null;
    }
    return {
      type: 'value',
      value: value
    };
  },
  number_sign(sign, number) {
    return sign.parse() + number.parse();
  },
  number_fract(number, dot, decimal) {
    return number.parse() + '.' + decimal.parse();
  },
  number_hex(head, octdigit) {
    return '0x' + octdigit.parse();
  },
  array(head, list, foot) {
    return list.parse().map(item => item.value);
  },
  nonemptyListOf(a, b, c) {
    return [a.parse(), ...c.parse()];
  },
  string_doubleQuote(quoteA, stringContent, quoteB) {
    return stringContent.parse()
  },
  string_singleQuote(quoteA, stringContent, quoteB) {
    return stringContent.parse()
  },
  _iter(children) {
      var ret = [];
      var hasObject = false;
      for (var child of children) {
        const value = child.parse();
        hasObject = hasObject || (typeof value === 'object');
        ret.push(value);
      }
    return hasObject ? ret : ret.join('');
  },
  _terminal() {
    return this.primitiveValue
  }
}
