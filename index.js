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

var parser = require('./libs/parser');
var variable = require('./libs/variable');
var { Block, WhileBlock, ForeachBlock } = require('./libs/block');

class StoryScript {
  constructor() {
    this.BLOCKSTACK = [];
    this.CURRENTBLOCK = null;
  }
  load(string) {
    const result = parser.parse(string);
    const system = new Block(result);
    this.CURRENTBLOCK = system;
    this.BLOCKSTACK = [];
    // variable.reset();
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let {value, done} = this.CURRENTBLOCK.next();
    if (done) {
      var CURRENTBLOCK = this.BLOCKSTACK.pop();
      if (CURRENTBLOCK) {
        this.CURRENTBLOCK = CURRENTBLOCK;
        variable.popScope();
        return this.next();
      } else {
        return { done: true }
      }
    } else {
      const retValue = this.handleScript(value);
      if (retValue) {
        return { value: retValue,  done: false}
      } else {
        // handleLogic will return undefined, so should exec next line
        return this.next();
      }
    }
  }
  handleScript(argLine) {
    // deep copy
    const line = Object.assign({}, argLine);

    if (line.type === 'content') {
      return this.handleContent(line);
    } else if (line.type === 'logic') {
      return this.handleLogic(line);
    } else {
      throw `Unrecognized type ${line.type}`;
    }
  }

  handleContent(line) {
    const params = line.params;
    const keys = Object.keys(params);
    for (const key of keys) {
      params[key] = params[key].value;
    }
    return line;
  }

  handleLogic(line) {
    switch (line.name) {
      case 'if': return this.handleLogic_IF(line);break;
      case 'while': return this.handleLogic_WHILE(line);break;
      case 'foreach': return this.handleLogic_FOREACH(line);break;
      case 'let': return this.handleLogic_LET(line);break;
      default: throw `Unrecognized name ${line.name}`;
    }
  }

  handleLogic_IF(line) {
    let blockIndex = 0;
    for (const condition of line.conditions) {
      if (variable.calc(condition)) {
        break;
      } else {
        blockIndex++;
      }
    }
    this.BLOCKSTACK.push(this.CURRENTBLOCK);
    const blockData = line.blocks[blockIndex];
    const block = new Block(blockData);
    this.CURRENTBLOCK = block;
    // variable.pushScope();
  }

  handleLogic_WHILE(line) {
    const result = variable.calc(line.condition);
    if (result) {
      this.BLOCKSTACK.push(this.CURRENTBLOCK);
      const blockData = line.block;
      const block = new WhileBlock(blockData, line.condition);
      this.CURRENTBLOCK = block;
    }
    // variable.pushScope();
  }

  handleLogic_FOREACH(line) {
    const children = variable.calc(line.children);
    if (children instanceof Array) {
      this.BLOCKSTACK.push(this.CURRENTBLOCK);
      const blockData = line.block;
      const block = new ForeachBlock(blockData, line.child, line.children);
      this.CURRENTBLOCK = block;
    } else {
      throw '[Foreach] Children must be a array';
    }
    // variable.pushScope();
  }

  handleLogic_LET(line) {
    variable.assign(line.left.value, line.left.prefix, line.right, line.explicit);
  }
}

module.exports = StoryScript;
