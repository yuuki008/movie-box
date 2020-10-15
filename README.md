
notificationsのリストを公開されて一週間経つと自動で削除されていくようにしたい

ファイル名が被ったら使えない

型推論　型を宣言はしない
型注釈　型を宣言毎回

基本的には面倒なので型推論です

let hello;

のように型推論ができない場合は、片注釈を行う。

### オブジェクトの型宣言の方法
const person:{
    name: string;
    age: number;
} = {
    name: 'Jack',
    age: 21
}
というように書く

const person: object = {
    name: 'Jack',
    age: 21
}

とすると
console.log(person.name)
でアクセスできない。それは、この書き方だとpersonはオブジェクトという型という情報しか持っていないから

const person: {} = {} これも書き方は一緒

typescriptは型推論に任せる
ネストが深くなり、オブジェクトの要素がオブジェクトの場合型注釈がどうしても面倒になるので、やはり型推論が正しい

const fruits = ['Apple', 'Banana', 'Grap', 1]

このようにnumberとstring型を混合させるとnumber|string[]となる 文字と数字の配列になる

const book = ['business', 1500, false]

このように１つ目は必ずstring、２つ目はnumber、３つ目はbooleanを入れたい場合につかうのがタプル型を使う
この場合は型注釈する

const book: [string, number, boolean] = ['bussiness', 1500, false]
こうすると通常のものにより厳しい宣言をすることができる。この順番の型出ないとエラーになる。
しかしこれは、エラーにならない。
book.push(21)
このように初期値からの制限は厳しいが後から追加することはできる
しかし追加はすることはできてもその追加した要素を参照、編集することはできない

### any型
 anyである何でも入れることもできるし、適当に参照することができる

any[]これだと配列の中身は自由になる
anyを入れてしまうとtypescriptの世界に戻ってしまう。
anyに関わったものは全てtypescriptとして挙動しない

###　リテラル型

const apple: 'apple' = 'apple'
これだとappleしか入れられなくなる.

### void
何も返さないと思われるがundefinedになる
そのためundefinedを使えばとなるが方定義でundefinedは使えない



