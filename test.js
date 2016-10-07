const StoryScript = require('./index');
const variable = require('./libs/variable');

// var userInput = `
// [bg file="kodoyuri/data.xp3/bgimage/white.png" trans]
// [flow wait time=200]
// #if x>1 && ((x < 10 && z >= 100) || z) || n == 'xxx'
// [text set bgfile="kodoyuri/data.xp3/image/massage_bg2.png" color=0xffffff]
// [text set speed=50]
// #elseif y <= 0x11
// [bg file="kodoyuri/data.xp3/bgimage/h01.png" trans]
// #elseif y == (x + (1 - 1) * -2) / +4
// [bg file="kodoyuri/data.xp3/bgimage/white.png" trans]
// #else
// #end
// #while x < 0
// [flow wait time=200]
// #end
//
// #foreach child in children
// [text set speed=50]
// #end
//
// [text show trans]`;
//
var userInput = `
#let x = 1
#$open = false
#let xxx = "sdfdsf"
#if x > 0 && xxx == 'sdfdsf'
  #let x = 2
  #let $open = 123
  [name flagA]
  #x = 3
#else
  [name flagB]
#end

#let i = 0
#while i < 5
  [name flagX]
  #i = i + 1
#end
测试 一下 sdjsdfj /c  /* 注释 */
// [wb]545第二行
#let y = false
/*
 * 其他测试
 123
 */
#let aaaa = 11
[name flagC]
#aaaa = aaaa ^ 2
`

const story = new StoryScript();
story.load(userInput);

let i = 0;
for (var value of story) {
  if (i === 0) {
    console.log(JSON.stringify(story.getData(), null, '  '))
  }
  i++
  console.log(value)
}

console.log(variable.dump())
console.log(story.getData())
