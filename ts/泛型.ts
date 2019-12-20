//例子

function createArray(length: number, value: any): Array<any> { //不清楚返回值与输入值的关系
  let result = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

//泛型
//下例中，我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
function createArrays<T>(length: number, value: T):Array<T> {
  let result = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}

//多个类型参数
//定义泛型的时候，可以一次定义多个类型参数：

function simple<U,T>(tuple:[U,T]):[T,U] {
  return [tuple[1],tuple[0]]
}

//泛型约束
//在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：使用接口约束形状
interface IsHasLength{
  length:number
}
function simples<T extends IsHasLength>(tuple:T):number {
  return tuple.length
}


//多个类型参数之间也可以互相约束：
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
      target[id] = (<T>source)[id];
  }
  return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });

//上例中，我们使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段

// 泛型参数的默认类型
// 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
function createArrayy<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
// 泛型类
// 与泛型接口类似，泛型也可以用于类的类型定义中：
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };


//当然也可以使用含有泛型的接口来定义函数的形状：
// interface CreateArrayFunc {
//   <T>(length: number, value: T): Array<T>;
// }

// let createArray: CreateArrayFunc;
// createArray = function<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//       result[i] = value;
//   }
//   return result;
// }

// createArray(3, 'x'); // ['x', 'x', 'x']
// 进一步，我们可以把泛型参数提前到接口名上：
// interface CreateArrayFunc<T> {
//   (length: number, value: T): Array<T>;
// }

// let createArray: CreateArrayFunc<any>;
// createArray = function<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//   for (let i = 0; i < length; i++) {
//       result[i] = value;
//   }
//   return result;
// }

// createArray(3, 'x'); // ['x', 'x', 'x']
// 注意，此时在使用泛型接口的时候，需要定义泛型的类型。