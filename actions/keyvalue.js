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
  content_mul(kv, space, content) {
    var ret = {
      flags: [],
      params: {}
    };
    var result = kv.parse();
    if (result.length === 1) {
      ret.flags.push(result[0]);
    } else {
      ret.params[result[0]] = result[1];
    }
    let ret2 = content.parse();
    ret.flags = ret.flags.concat(ret2.flags);
    Object.assign(ret.params, ret2.params);
    return ret;
  },
  content_base(kv) {
    var ret = {
      flags: [],
      params: {}
    };
    var result = kv.parse();
    if (result.length === 1) {
      ret.flags.push(result[0]);
    } else {
      ret.params[result[0]] = result[1];
    }
    return ret;
  },
  keyValue_param(key, syntex, value) {
    return [key.parse(), value.parse()]
  },
  keyValue_flag(key) {
    return [key.parse()]
  }
}
