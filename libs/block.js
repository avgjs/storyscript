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

var parser = require('./parser');
var variable = require('./variable');

class IfBlock {
  constructor(data, blockIndex) {
    this.reset();
    this.data = data;
    this.blockIndex = blockIndex;
    variable.pushScope();
  }
  reset() {
    this.data = [];
    this.currentLine = 0;
    this.done = false;
  }
  getData() {
    return {
      type: 'if',
      currentLine: this.currentLine,
      blockIndex: this.blockIndex
    }
  }
  setCurrentLine(no) {
    this.currentLine = no;
  }
  getLine(no) {
    return this.data[no];
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    if (this.currentLine < this.data.length) {
      let line = this.data[this.currentLine++];
      return { value: line, done: false };
    } else {
      // !this.done && variable.popScope();
      // this.done = true;
      return { done: true };
    }
  }
}

class WhileBlock {
  constructor(data, condition) {
    this.reset();
    this.data = data;
    this.condition = condition;
    variable.pushScope();
  }
  reset() {
    this.data = [];
    this.currentLine = 0;
    this.done = false;
  }
  getData() {
    return {
      type: 'while',
      currentLine: this.currentLine
    }
  }
  setCurrentLine(no) {
    this.currentLine = no;
  }
  getLine(no) {
    return this.data[no];
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    if (this.currentLine < this.data.length) {
      let line = this.data[this.currentLine++];
      return { value: line, done: false };
    } else {
      if (variable.calc(this.condition)) {
        this.currentLine = 0;
        variable.popScope();
        variable.pushScope();
        return this.next();
      } else {
        // !this.done && variable.popScope();
        // this.done = true;
        return { done: true };
      }
    }
  }
}

class ForeachBlock {
  constructor(data, child, children) {
    this.reset();
    this.data = data;
    this.child = child;
    this.children = variable.calc(children);
    this.index = 0;
    variable.pushScope();
    variable.assign(this.child.value, this.child.prefix,
      { type: 'value', value: this.children[this.index] }, true);
  }
  reset() {
    this.data = [];
    this.currentLine = 0;
    this.done = false;
  }
  getData() {
    return {
      type: 'foreach',
      currentLine: this.currentLine
    }
  }
  setCurrentLine(no) {
    this.currentLine = no;
  }
  getLine(no) {
    return this.data[no];
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    if (this.currentLine < this.data.length) {
      let line = this.data[this.currentLine++];
      return { value: line, done: false };
    } else {
      if (this.index < this.children.length - 1) {
        this.currentLine = 0;
        this.index++;
        variable.popScope();
        variable.pushScope();
        variable.assign(this.child.value, this.child.prefix,
          { type: 'value', value: this.children[this.index] }, true);
        return this.next();
      } else {
        // !this.done && variable.popScope();
        // this.done = true;
        return { done: true };
      }
    }
  }
}

module.exports = { IfBlock, WhileBlock, ForeachBlock };
