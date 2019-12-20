//enum关键字
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
//0,1,2,3,4,5,6 一一对应
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true

//默认值

enum Dayss { Sun, Mon = 7, Tue, Wed, Thu, Fri, Sat }; //会在默认值后面递增
//0,7,8,9,10,11,12

//覆盖

enum Daysss { Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat };
//3,1,2,3,4,5,6
//此时会出现覆盖 应避免这种情况


//可以不是数字不过需要类型断言
enum Dayssss { Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat = <any>'s' };

//计算枚举
enum Daysssss { Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat = 'red'.length };
//计算枚举的错误例子 计算枚举后面需要紧跟被赋值的元素 否则无法获得初始值
//enum Dayssssss { Sat = 'red'.length,Sun, Mon = 1, Tue, Wed, Thu, Fri,  };
enum Daysssssss { Sat = 'red'.length, Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, };


//不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 1。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 0。
// 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
// 数字字面量
// 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
// 带括号的常数枚举表达式
// +, -, ~ 一元运算符应用于常数枚举表达式
// +, -, *, /, %, <<, >>, >>>, &, |, ^ 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错
// 所有其它情况的枚举成员被当作是需要计算得出的值。
//常数枚举  常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

const enum Dayssssssss {
  Sun, Mon, Tue, Wed, Thu, Fri, Sat
}

//外部枚举 全局枚举
declare enum Daysssssssss{

}
//全局常数枚举
declare const enum Dayssssssssss{

}