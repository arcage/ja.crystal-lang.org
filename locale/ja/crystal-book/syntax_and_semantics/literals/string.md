# 文字列 (String)

[String](http://crystal-lang.org/api/String.html) は UTF-8 文字の不変な列を表します。

通常、ダブルクォート (`"`) で囲まれたUTF-8でエンコードされた文字の並びで文字列リテラルを記述します。

```crystal
"hello world"
```

## エスケープ文字

文字列中では、バックスラッシュによる名前つきのエスケープシーケンスやコードポイントの数値表現によって、特別な文字を記述できます。

次のエスケープシーケンスが有効です。
```crystal
"\""                  # ダブルクォート
"\\"                  # バックスラッシュ
"\a"                  # アラート
"\b"                  # バックスペース
"\e"                  # エスケープ
"\f"                  # フォームフィード (改ページ)
"\n"                  # 改行
"\r"                  # キャリッジリターン (復帰)
"\t"                  # タブ文字
"\v"                  # 垂直タブ
"\888"                # 8進数による ASCII 文字
"\xFF"                # 16進数による ASCII 文字
"\uFFFF"              # 16進数によるユニコード文字
"\u{0}".."\u{10FFFF}" # 16進数によるユニコード文字
```

その他の文字がバックスラッシュに続いた場合、その文字自身を表すものになります。

バックスラッシュに続く最大3つの0から7までの数値は、8進数によるコードポイントの記述となります。

```crystal
"\101" # => "A"
"\123" # => "S"
"\12"  # => "\n"
"\1"   # コードポイント1の文字が1つだけの文字列
```

バックスラッシュに`u`を続けることでユニコードのコードポイントを記述できます。ユニコードの文字を表現するため、ちょうど4つの16進数の数値か (`\u0000` to `\uFFFF`) かひげ括弧で囲った6つまでの16進数の数値が利用できます (`\u{0}` to `\u{10FFFF}`

```crystal
"\u0041"    # => "A"
"\u{41}"    # => "A"
"\u{1F52E}" # => "🔮"
```

1つのひげ括弧の中にスペースで区切って複数のユニコード文字が記述できます。

```crystal
"\u{48 45 4C 4C 4F}" # => "HELLO"
```

## 文字列の補間

補間を伴う文字列リテラルは、文字列に実行時に展開される式を埋め込むことができます。

```crystal
a = 1
b = 2
"sum: #{a} + #{b} = #{a + b}" # => "sum: 1 + 2 = 3"
```

String interpolation is also possible with [String#%](https://crystal-lang.org/api/String.html#%25%28other%29-instance-method).

任意の式を文字列の補間として書くことができますが、可読性を高めるためそれらの式は小さなものに保ったほうが良いです。

`#`をバックスラッシュでエスケープするか、`%q()`のような補間を許可しないような文字列リテラルを使うことで、補間を無効にできます。

```crystal
"\#{a + b}"  # => "#{a + b}"
%q(#{a + b}) # => "#{a + b}"
```

Interpolation is implemented using a [String::Builder](http://crystal-lang.org/api/String/Builder.html) and invoking `Object#to_s(IO)` on each expression enclosed by `#{...}`. 式`"sum: #{a} + #{b} = #{a + b}"`は次に等しいです。

```crystal
String.build do |io|
  io << "sum: "
  io << a
  io << " + "
  io << b
  io << " = "
  io << a + b
end
```

# パーセント文字列リテラル

ダブルクォートによる文字列リテラルの他に、Crystalはパーセント記号 (`%`) と区切り文字の組による文字列リテラルもサポートしています。有効な区切り文字は、括弧`()`、角括弧`[]`、ひげ括弧`{}`、三角括弧`<>`そしてパイプ文字`||`です。パイプ文字を除いて、すべての区切り文字はネストに応じて適切に処理されます。

ダブルクォートを含むような文字列を書くのにこれらのリテラルはお手軽です。

```crystal
%(hello ("world")) # => "hello (\"world\")"
%[hello ["world"]] # => "hello [\"world\"]"
%{hello {"world"}} # => "hello {\"world\"}"
%<hello <"world">> # => "hello <\"world\">"
%|hello "world"|   # => "hello \"world\""
```

`%q`で記述される文字列リテラルは、文字列の補間とエスケープを受け付けません。また`%Q`は`%`と同じ意味を持ちます。

```crystal
name = "world"
%q(hello \n #{name}) # => "hello \\n \#{name}"
%Q(hello \n #{name}) # => "hello \n world"
```

## パーセント文字列配列リテラル

1つの文字列を表すリテラルの他に、文字列の[配列](https://crystal-lang.org/api/Array.html)を表すパーセントリテラルがあります。それは`%w`と区切り文字の組によって記述します。有効な区切り文字は[パーセント文字列リテラル](#percent-string-literals)のときと同じです。

```crystal
%w(foo bar baz)  # => ["foo", "bar", "baz"]
%w(foo\nbar baz) # => ["foo\\nbar", "baz"]
%w(foo(bar) baz) # => ["foo(bar)", "baz"]
```

`%w`で記述されたリテラルはスペースを除くエスケープと文字列の補間を受け付けないことに注意してください。もちろん、エスケープされた1つのスペース (` `) では文字列は区切られません。

```crystal
%w(foo\ bar baz) # => ["foo bar", "baz"]
```

## 複数行の文字列

任意の文字列リテラルは複数行にまたがって記述できます。

```crystal
"hello
      world" # => "hello\n      world"
```

上の例では、先頭と末尾の空白、および改行が結果の文字列にも入っていることに注目してください。これを防ぐために、文字列リテラルを行毎に分割して、バックスラッシュで結合するという手段を取ることができます。

```crystal
"hello " \
"world, " \
"no newlines" # same as "hello world, no newlines"
```

もしくは、バックスラッシュに改行を続けたものを文字列中に追加する、という手段もあります。

```crystal
"hello \
     world, \
     no newlines" # same as "hello world, no newlines"
```

この場合、先頭の空白が結果の文字列に含まれることはありません。

## ヒアドキュメント

*ヒアドキュメント*ないし*heredoc*は複数行にまたがる文字列の便利な書き方です。
ヒアドキュメントは`<<-`とそれに続くアルファベットと数字 (アンダースコアも含めることができる) の並びの識別子によって記述されます。ヒアドキュメントは続く行から開始して、最初に指定した識別子のみを含む行 (先頭の空白は無視されます) で終了します。また、ヒアドキュメントのあとには改行の他にアルファベットと数字の文字以外の文字が続く場合があります。

```crystal
<<-XML
<parent>
  <child />
</parent>
XML
```

最後の行のヒアドキュメントの識別子の前の空白の個数分だけ、ヒアドキュメントの内容から先頭の空白文字が削除されます。

```crystal
<<-STRING # => "Hello\n  world"
  Hello
    world
  STRING

<<-STRING # => "  Hello\n    world"
    Hello
      world
  STRING
```

ヒアドキュメントの直後にそれに対するメソッド呼び出しを続けたり、括弧の中でヒアドキュメントを使うことも可能です。

```crystal
<<-SOME.upcase # => "HELLO"
hello
SOME

def upcase(string)
  string.upcase
end

upcase(<<-SOME) # => "HELLO"
  hello
  SOME
```

ヒアドキュメントの中では一般的に補間とエスケープが有効になっています。

ヒアドキュメントの中で補間やエスケープを禁止したい場合、ヒアドキュメント冒頭の識別子をシングルクォートで囲ってください。

```crystal
<<-'HERE' # => "hello \\n \#{world}"
  hello \n #{world}
  HERE
```
