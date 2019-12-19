let str: string = 'zzz';
console.log(str);
let flag: boolean = false;
let num: number = 111;
let list: number[] = [1, 2, 3];
let arr: Array<number> = [2, 3, 4];

// 元组 Tuple
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
let x:[string, number]; //元组

enum Color { //默认从0开始往后据前位++ //枚举型
  red = 1, blue = 4, Green
};


let y: Color = Color.Green;
let z: string = Color[1];
console.log(`${z}${y}`);

let a: any = 1; //任意型类似var
let b: any[] = [1, 2, '222'] //任意类型的数组

function warnUser(): void { //void型表示无返回值
  console.log("This is my warning message");
}
//声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let c: void = undefined


let u: undefined = undefined;
let n: null = null;

//默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。

//Never
//never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

//never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
//never的使用
function mynever(messages: string): never {
  throw new Error(messages);
}

//类型断言

let mystring:any = 'this'
let mylength = (<String>mystring).length
let mylengthas = (mystring as String).length //jsx仅支持
