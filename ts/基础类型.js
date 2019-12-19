var str = 'zzz';
console.log(str);
var flag = false;
var num = 111;
var list = [1, 2, 3];
var arr = [2, 3, 4];
var x; //
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["blue"] = 4] = "blue";
    Color[Color["Green"] = 5] = "Green";
})(Color || (Color = {}));
;
var y = Color.Green;
var z = Color[1];
console.log("" + z + y);
var a = 1; //任意型类似var
var b = [1, 2, '222']; //任意类型的数组
function warnUser() {
    console.log("This is my warning message");
}
//声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
var c = undefined;
var u = undefined;
var n = null;
//默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
//Never
//never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
//never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
//never的使用
function mynever(messages) {
    throw new Error(messages);
}
//类型断言
var mystring = 'this';
var mylength = mystring.length;
var mylengthas = mystring.length; //jsx仅支持
