
//几种定义方式
//1
let arr: number[] = [1212, 12212]
//2数组泛型
let brr: Array<number> = [1212, 12212]
//3用接口表示数组
interface Crr {
  [index: number]: number
}

let drr: Crr = [121, 23, 31, 3]
//通常用来表示类数组如arguments node节点数组 如下示例

function lArray() {
  //let arr:number = arguments //报错
  let arr: {
    [index: number]: number;
    length: number;
    callee: Function
  } = arguments
  let args: IArguments = arguments; //arguments有自己的接口
  //interface IArguments {
  //     [index: number]: any;
  //     length: number;
  //     callee: Function;
  // }
}

//4 any型数组 存储任意类型

let err:any[] = ['1',1]
