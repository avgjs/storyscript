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
  StoryLine_formatA(head, command, content) {
    var content = content.parse();
    return {
      type: 'content',
      command: command.parse(),
      flags: content.flags,
      params: content.params,
    }
  },
  StoryLine_formatB(head, command, content, foot) {
    var content = content.parse();
    return {
      type: 'content',
      command: command.parse(),
      flags: content.flags,
      params: content.params,
    }
  },
  StoryLine_formatC(head, command) {
    return {
      type: 'content',
      command: command.parse(),
      flags: [],
      params: {},
    }
  },
  StoryLine_formatD(head, command, foot) {
    return {
      type: 'content',
      command: command.parse(),
      flags: [],
      params: {},
    }
  },
  StoryLine_formatE(text) {
    var textContent = text.parse();
    return {
      type: 'content',
      command: '*',
      flags: [],
      params: { raw: { type: 'value', value: textContent } },
    }
  },
  command(key) {
    return key.parse();
  }
}
