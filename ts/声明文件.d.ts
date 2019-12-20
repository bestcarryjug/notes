//声明文件必须以.d.ts结尾
//声明全局变量一般都是不可更改的使用const声明
declare const baseurl: string;
//声明全局方法
declare function fns(fn: () => any): string;
//声明全局类
declare class Animal {
  name: string;
  constructor(name: string);
  sayhi(): string; //只能定义类型
}
//声明全局枚举
declare enum Son {
  up,
  dowm,
  right,
  left
}
//声明全局命名空间 用来避免全局空间污染所有的接口类型之类的定义可以在里面通过jquery.来调用
declare namespace jquery {
  function ajax(url: string, type: string, data: string): void;
  const version: number;
  class Event {
    blur(eventType: EventType): void
  }
  enum EventType {
    CustomClick
  }
  //多层嵌套
  namespace fn {
    function extend(object: any): void;
  }
}
//如果全局对象只有一个属性fn
declare namespace jquery.fn{

}
//声明全局接口
interface jsn{
  age?:number;
  name:string
}

//声明全局type
//同上

//声明合并 
//假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），
//那么我们可以组合多个声明语句，它们会不冲突的合并起来
declare function jQuery(selector: string): any;
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}

//export  调用解构赋值
export const name: string;
export function getName(): string;
export class Animals {
    constructor(name: string);
    sayHi(): string;
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}
export interface Options {
    data: any;
}

//declare 声明的全局属性可以用export导出
export {baseurl}


//export namespace 
export namespace foo {
  const name: string;
  namespace bar {
      function baz(): string;
  }
}

//export default ，只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出如下
// const a = 1
// export default a //一般直接写在顶部

// 在 commonjs 规范中，我们用以下方式来导出一个模块：
// // 整体导出
// module.exports = foo;
// // 单个导出
// exports.bar = bar;
// 在 ts 中，针对这种模块导出，有多种方式可以导入，第一种方式是 const ... = require：
// // 整体导入
// const foo = require('foo');
// // 单个导入
// const bar = require('foo').bar;
// 第二种方式是 import ... from，注意针对整体导出，需要使用 import * as 来导入：
// // 整体导入
// import * as foo from 'foo';
// // 单个导入
// import { bar } from 'foo';
// 第三种方式是 import ... require，这也是 ts 官方推荐的方式：
// // 整体导入
// import foo = require('foo');
// // 单个导入
// import bar = foo.bar;
// 对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 export = 这种语法了21：
// // types/foo/index.d.ts

// export = foo;

// declare function foo(): string;
// declare namespace foo {
//     const bar: number;
// }