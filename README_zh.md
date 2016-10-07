# Storyscript

## 简介及设计思想

Storyscript 是一套用于表达 AVG 剧情的脚本系统，是 AVG.js 的官方模块之一。与其他 AVG 引擎的脚本系统类似，它也是依照文本顺序依次执行；语法上，与 BKEngine 的脚本系统颇为类似，但更为简单。

以往的 AVG 脚本，包含了整个游戏全部的程序实现，但相对 Lua、Javasciprt 等成熟的程序语言，其类似标记语言的语法却十分简陋，在这个基础上实现程序逻辑无论对程序员还是普通的爱好者都是一份困扰。

AVG.js 已经将游戏UI、演出效果等强逻辑内容从 AVG 脚本中剥离，剩下的只有简单的指令性代码，这便是 Storyscript 之名的由来。

Storyscript 致力于降低学习难度，让非程序员完全能够掌握其使用方法，使策划、剧本、演出师等人员能够自行完成游戏内容的制作，减少不必要的沟通环节。

有关 AVG.js 及 Storyscript 的详细信息请访问 <https://avgjs.org>

## 安装与使用

Storyscript 已作为初始模块内置于 AVG.js 工程中，若你想要在 AVG.js 中使用它，请参考 AVG.js 相关教程。

下面只介绍在其他工程中的使用方法：

**安装**

```shell
npm install avg-storyscript
```

**使用**

```javasciprt
import Story from 'avg-storyscript';
const story = new StoryScript();
story.load(scriptString);
for (const line of story) {
  // do something
}
```

详细请参考 test.js 文件

## 语法简介

Storyscript 脚本系统分为**内容脚本**和**逻辑脚本**。

内容脚本：表示游戏剧情的变化，如打印对话、显示立绘、切换背景图片、播放声音等

逻辑脚本：控制游戏剧情的走向或提供一些方便的程序功能，如变量赋值、条件分支、循环等

### 内容脚本

**基本语法**

```shell
[command flag param="value"]
```

command: 指令名<br>
flag: 标记<br>
param: 参数

例如

```shell
[bgm autoplay loop file="abc.ogg" volume=100]
```

将被解析为

```javasciprt
{
  command: 'bgm',
  flags: ['autoplay', 'loop'],
  params: {
    file: "abc.ogg",
    volume: 100
  }
}
```

### 逻辑脚本

#### 语句

**LET**

```
#let foo = 123  // 标准方式
#bar = 456      // 可省略 let
#let foobar     // 可不赋值（值为null），此时 let 不可省略
```

**If**

```
#if foo > bar
// do something
#elseif foo == bar
// do something
#else
// do something
#end
```

其中，`elseif` 和 `else` 都是可选的。

**While**

```
#while i < 10
// do something
#end
```

暂不支持 `break` 和 `continue`，它们还在 TODO 列表中 : )

**Foreach**

```
#foreach child in children
// do something
#end
```

`children` 是一个数组，这里有一些特殊的情况，请往下阅读。

#### 变量

支持简单的变量赋值和修改操作，同时为适应 AVG 游戏的需求，不同的变量在存档时有不同的处理。

**全局存档变量**

以 `$` 开头的变量将被视为全局存档变量，意思是说，它一旦被赋值将在任何情况下都能被读取，无论是读取了新的档案还是使用以前的档案。你可以用它来控制CG鉴赏的解锁，或是标明周目数。

```
#let $gameclear = true;
```

**单存档变量**

以 `%` 开头的变量将被视为单存档变量，意思是说，它将只在某些特定的存档中有效，读取其他档案后将被覆盖。通常用来控制路线或好感度。

```
#let %girl_favor_num = 1;
```

**普通变量**

其他情况下的变量名都是普通变量，在存档中，只有存档点所在的「块」及父「块」中的普通变量将被保存（见下）。普通变量仅用于单文件内使用，请勿用于保存好感度等。

```
#let x = 0;
```

**作用域**

全局存档变量和单存档变量在任何位置都有效，故可视为全局变量（注：全局存档变量和全局变量完全没有联系，前者是说其在存档中的保存方式，后者是说其在游戏脚本中何处可以读取）

对于普通变量，它的作用域是「块」，如一个 IF 分支中的内容或 While 语句中的内容，均为一个「块」。最大的「块」是「文件」，也就是说，即使你不在 IF While 等语句块中声明变量，而是在它们的外面，变量起作用的范围也仅限于当前的脚本文件。
