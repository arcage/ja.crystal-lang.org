# struct

`lib` の内部で `struct` を宣言することで、C の構造体を宣言できます。

```crystal
lib C
  # C では:
  #
  #  struct TimeZone {
  #    int minutes_west;
  #    int dst_time;
  #  };
  struct TimeZone
    minutes_west : Int32
    dst_time : Int32
  end
end
```

同じ型のフィールドは複数指定することも可能です。

```crystal
lib C
  struct TimeZone
    minutes_west, dst_time : Int32
  end
end
```

再帰的な構造体も期待通りに動作します。

```crystal
lib C
  struct LinkedListNode
    prev, _next : LinkedListNode*
  end

  struct LinkedList
    head : LinkedListNode*
  end
end
```

構造体のインスタンスを生成するには `new` を利用します。

```crystal
tz = C::TimeZone.new
```

これによって、スタックに構造体が割り当てられます。

C の構造体は、初期状態として、すべての値が「ゼロ」の状態になります。つまり、整数と浮動小数点数はゼロで、ポインタはゼロのアドレスを指している、などの状態です。

このように初期化されることを避けたい場合は `uninitialized` を利用します。

```crystal
tz = uninitialized C::TimeZone
tz.minutes_west # => some garbage value
```

プロパティの設定、および参照が可能です。

```crystal
tz = C::TimeZone.new
tz.minutes_west = 1
tz.minutes_west # => 1
```

代入された値がプロパティの型と正確に同じものでない場合、[to_unsafe](to_unsafe.html) を呼び出して型を一致させようとします。

また、フィールドは[名前付き引数](../default_and_named_arguments.html)と同様のシンタックスを使って初期化することもできます。

```crystal
tz = C::TimeZone.new minutes_west: 1, dst_time: 2
tz.minutes_west # => 1
tz.dst_time     # => 2
```

C の構造体は関数やメソッドに (コピーとして) 値渡しされます。また、メソッドから返るときも値で渡されます。

```crystal
def change_it(tz)
  tz.minutes_west = 1
end

tz = C::TimeZone.new
change_it tz
tz.minutes_west # => 0
```

構造体のフィールドに使用可能な型の指定方法については[型の文法](../type_grammar.html)を参照してください。
