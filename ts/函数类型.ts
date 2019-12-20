//1 普通定义

function fn(params: number): number {
  return params
}

// 2表达式

let fn1 = function (params: number): number {
  return params
}  //事实上没有声明类型 ts通过类型推论

let fn2: (params: number) => number = function (params: number): number {
  return params
}   //非等价于es6箭头函数 左边函数类型


//3 接口定义函数

interface Fn3 {
  (params: number): number //返回值类型
}

let fn3: Fn3 = function (params: number): number {
  return params
}
//4 可选参数 参数？ 必须接在必选参数后面
let fn4: (params: number, age?: number) => number = function (params: number, age?: number): number {
  return params
}

//5 参数默认值 必选参数默认值 有默认可不遵守 可选参必须接在必选参数后面规则
function fn5( age?: number,params: number =1):number {
  return params
}

//6剩余参数 ...
function fn6(params:number,...item:any[]) :number{
  return params
}

//7重载 函数可以重复定义 输入number返回number 输入string返回string 比较直观否则并不清楚输入number|string返回number|string对应关系
function reverse(x:number):number;
function reverse(x:string):string;
function reverse(x:number|string): number|string{
  if(typeof x === 'number'){
    return Number(x.toString().split('').reverse().join(''))
  }
  return x.split('').reverse().join('')
}
  

