# Storyscript

[中文版请点击此处 (View Chinese Edition)]()

## Introduction and Design Ideas

Storygscript is a set of scripting systems for expressing AVG stories and is one of the official modules of AVG.js. Similar to the scripting system of other AVG engines, it is executed in the order of text; grammatically, it is quite similar to BKEngine's scripting system, but simpler.

The previous AVG script, including the entire game of all the program logic, but relatively Lua, Javasciprt and other mature programming language, the markup language syntax is very simple, on this basis to achieve the program logic, whether programmers or ordinary enthusiasts Are a troubled.

AVG.js AVG script has been stripped off the game UI, performance effects and other strong logic, and the rest is only a simple instructional code, which is the origin of the name Storyscript.

Storyscript aims to reduce the difficulty of learning, so that non-programmers can fully grasp their use, so that designers and other personnel to complete the production of game content and reduce unnecessary communication links.

For more information about AVG.js and Storyscript, please visit <https://avgjs.org>

## Installation and Usage

Storyscript has been built into the AVG.js project as the initial module. If you want to use it in AVG.js, please refer to the AVG.js tutorial.

If used in other projects, as follows:

**Installation**

```shell
npm install avg-storyscript
```

**Usage**

```javasciprt
import Story from 'avg-storyscript';
const story = new StoryScript();
story.load(scriptString);
for (const line of story) {
  // do something
}
```

Refer to the test.js file for details.

## Syntax

StoryScript consists of **Content Script** and **Logical Script**.

Content script: changes in the game plot, such as print dialogue text, display characters, switch the background picture, play sound, etc.

Logic Script: Controls the direction of the game plot or provides convenient programming logic such as variable assignment, conditional branching, loops, etc.

### Content Script

**Basic**

```shell
[command flag param="value"]
```

For example

```shell
[bgm autoplay loop file="abc.ogg" volume=100]
```

Will be parsed as

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

### Logical Script

#### Statement

**LET**

```
#let foo = 123  // standard way
#bar = 456      // omit let
#let foobar     // can not assign value (value will be null), thus `let` can not be omitted
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

Among them, `elseif` and`else` are optional.

**While**

```
#while i < 10
// do something
#end
```

Currently `break` and`continue` are not supported, but they are in TODO list :)

**Foreach**

```
#foreach child in children
// do something
#end
```

`children` is an array, there are some special circumstances, please read on.

#### Variables

Support for simple variable assignment and modify operations, and to meet the needs of AVG, different variables in the archive have different treatment.

**Global Archive Variables**

Variables that begin with `$` will be treated as global archive variables, meaning that once assigned, they will be read in any case, either by reading a new archive or by using a previous archive. You can use it to control the unlock CG appreciation, or support _New Game+_.

```
#let $gameclear = true;
```

**Single archive variable**

Variables that start with `%` are treated as single archive variables, meaning that they will only be valid in certain archives and will be overwritten when other archives are read. Usually used to control the route or favorability.

```
#let %girl_favor_num = 1;
```

**Common variables**

In other cases, the variable name is a normal variable, in the archive, only the archive point where the "block" and the parent "block" common variables will be saved (see below). Common variables are used only for single-file use. Do not use them to save favorability.

```
#let x = 0;
```

**Scopes**

Global archive variables and single archive variables are valid at any location, and are therefore considered global variables.

(NOTE: The global archive variable is completely unrelated to the global variable, the former is about how it is saved in the archive, while the other is about where it can be access in the game script)

For a normal variable, its scope is "block", such as an IF branch or the contents of the While statement, are a "block." The largest "block" is the "file", that is, even if you do not declare variables such as IF While, but outside of them, variables in the scope of the work is limited to the current script file.
