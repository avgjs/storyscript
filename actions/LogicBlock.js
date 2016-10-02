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
  LogicBlock_IF(IF, LogicBlock1, ELSEIFs, LogicBlock2s, ELSE, LogicBlock3, END) {
    // get conditions
    var conditions = [IF.parse()];
    for (var ELSEIF of ELSEIFs.children) {
      conditions.push(ELSEIF.parse());
    }

    // get stroy block
    var blocks = [];
    var block1 = [];
    for (var LogicBlock of LogicBlock1.children) {
      block1.push(LogicBlock.parse());
    }
    blocks.push(block1);
    for (var LogicBlock2 of LogicBlock2s.children) {
      var block2 = [];
      for (var LogicBlock of LogicBlock2.children) {
        block2.push(LogicBlock.parse());
      }
      blocks.push(block2);
    }
    var block3 = [];
    if (LogicBlock3.child(0)) {
      for (var LogicBlock of LogicBlock3.child(0).children) {
        block3.push(LogicBlock.parse());
      }
    }
    blocks.push(block3);

    return {
      type: 'logic',
      name: 'if',
      conditions: conditions,
      blocks: blocks
    }
  },
  LogicBlock_WHILE(WHILE, LogicBlocks, END) {
    var condition = WHILE.parse();
    var block = [];
    for (var LogicBlock of LogicBlocks.children) {
      block.push(LogicBlock.parse());
    }
    return {
      type: 'logic',
      name: 'while',
      condition: condition,
      block: block
    }
  },
  LogicBlock_FOREACH(FOREACH, LogicBlocks, END) {
    var condition = FOREACH.parse();
    var block = [];
    for (var LogicBlock of LogicBlocks.children) {
      block.push(LogicBlock.parse());
    }
    return {
      type: 'logic',
      name: 'foreach',
      child: condition.child,
      children: condition.children,
      block: block
    }
  },
  IF(head, Expression) {
    // condtion Object
    return Expression.parse();
  },
  ELSEIF(head, Expression) {
    // condtion Object
    return Expression.parse();
  },
  WHILE(head, Expression) {
    // condtion Object
    return Expression.parse();
  },
  FOREACH(head, childVar, _in, childrenVar) {
    return {
      child: childVar.parse(),
      children: childrenVar.parse()
    }
  }
}
