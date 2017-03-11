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

module.exports = `
BKS {
  Scripts
    = LogicBlock*

  LogicBlock
    = Comment
    | IF LogicBlock* (ELSEIF LogicBlock*)* (ELSE LogicBlock*)? END  -- IF
    | WHILE LogicBlock* END  -- WHILE
    | FOREACH LogicBlock* END  -- FOREACH
    | LET                      -- LET
    | StoryLine                       -- Story

  Comment = "//" comment_single     -- single
          | "/*" comment_multi "*/"       -- multi

  comment_single = (~("\\n" | "\\r") any)+
  comment_multi = (~("*/") any)+

  StoryLine
    = "[" command content "]"    -- formatB
      | "@" command content ("\\r"|"\\n"|end)  -- formatA
      | "@" command ("\\r"|"\\n"|end)  -- formatC
      | "[" command "]"    -- formatD
      | text -- formatE

  text = (~("[" | "@" | "#" | "\\n" | "\\r" | "//" | "/*") any)+

  command = key

  content = keyValue " " content -- mul
  | keyValue                -- base

  keyValue = key "=" value  -- param
    | key        -- flag

  key = (letter | number | "_")+

  value = string | number | boolean | "null" | array

  array = "[" listOf<value, ","> "]"

  string = "\\"" doubleQuoteStringContent* "\\"" -- doubleQuote
      | "\\'" singleQuoteStringContent* "\\'" -- singleQuote

// ~("\\'" | "\\\\" ) any  -- nonEscaped

  singleQuoteStringContent = ~("\\'") any  -- nonEscaped
      | "\\\\" escapeCharacter                 -- escaped

  doubleQuoteStringContent = ~("\\"") any  -- nonEscaped
      | "\\\\" escapeCharacter                 -- escaped

  singleEscapeCharacter = "'"|"\\""|"\\\\"|"b"|"f"|"n"|"r"|"t"|"v"
  escapeCharacter = singleEscapeCharacter | "x" | "u"

  quote = "\\"" | "\\'"

  boolean = ("true" | "false") ~variable

  number  (a number)
    = ("-"|"+") number   -- sign
    | digit* "." digit+  --  fract
    | "0x" hexdigit+        --  hex
    | digit+             --  whole

  hexdigit
    = "a".."f" | "A".."F" | digit

  variable = ~number ("$" | "%")? (letter | number | "_")+

  IF
    = "#if" Exp

  LET
    = ("#let" | "#") variable "=" Exp  -- assign
    | "#let" variable              -- nonAssign

  END
    = "#end"

  ELSE
    = "#else"

  ELSEIF
    = "#elseif" Exp

  WHILE
    = "#while" Exp

  FOREACH
    = "#foreach" variable "in" variable

  Exp
    = JudgeExp booleanOperator Exp  -- bool
    | JudgeExp

  booleanOperator = "&&" | "||"

  JudgeExp
    = AddExp judgeOperator AddExp     -- judge
    | AddExp

  judgeOperator = "==" | ">=" | "<=" | ">" | "<"

  // MathExp
  // = MathExp mathOperator MathExp  -- math
  // | PriExp

  // mathOperator = "+" | "-" | "*" | "/" | "^" | "%"

  AddExp
  = AddExp ("+" | "-") MulExp  -- add
  // | AddExp "-" MulExp  -- minus
  | MulExp

  MulExp
    = MulExp ("*" | "/" | "%") ExpExp  -- mul
    // | MulExp "/" ExpExp  -- divide
    // | MulExp "%" ExpExp  -- mod
    | ExpExp

  ExpExp
    = PriExp "^" ExpExp  -- power
    | PriExp

  PriExp
  = "(" Exp ")"  -- paren
  | "+" PriExp   -- pos
  | "-" PriExp   -- neg
  | value
  | variable

}
`;
