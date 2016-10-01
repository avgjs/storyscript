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
var prettyjson = require('prettyjson');
var parser = require('./libs/parser');

var userInput = `
[bg file="kodoyuri/data.xp3/bgimage/white.png" trans]
[flow wait time=200]
#if x>1 && ((x < 10 && z >= 100) || z) || n == 'xxx'
[text set bgfile="kodoyuri/data.xp3/image/massage_bg2.png" color=0xffffff]
[text set speed=50]
#elseif y <= 0x11
[bg file="kodoyuri/data.xp3/bgimage/h01.png" trans]
#elseif y == x
[bg file="kodoyuri/data.xp3/bgimage/white.png" trans]
#else
#end
#while x < 0
[flow wait time=200]
#end

#foreach child in children
[text set speed=50]
#end

[text show trans]`;

var time = Date.now();
var result = parser.parse(userInput);
console.log(Date.now() - time);
// console.log(prettyjson.render(result));
