
interface Label {
  label: String
}

function printLabel(labelValue: Label) {
  console.log(labelValue.label)
}
let value = { label: '123' }
printLabel(value)
//可选属性
interface LabelTwo {
  red?: String, //可选属性
}
//和函数可选参一致
function color(red?: String): String {
  return red || 'white'
}
//只读
interface LabelThree {
  readonly red: String, //只读属性
}
let array: ReadonlyArray<number> = [1, 2, 3] //只读数组 所有更改方法及属性均被去掉了


let colors: LabelThree = { //创建后不可更改
  red: "white"
}

//多未知属性
interface NoKnow {
  width: string;
  [propName: string]: any;
}

//函数类型
interface Fn {
  (key: string, value: number): boolean
}


let func: Fn = function (key: string, value: number): boolean { //函数参数名可以不匹配但是类型得一致
  return !!value

}
//ts 手写一个冒泡排序

const bubbling: (arr: number[]) => number[] = function (arr: number[]):number[] {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j] + arr[j + 1]
        arr[j + 1] = arr[j] - arr[j + 1]
        arr[j] = arr[j] - arr[j + 1]
      }
    }
  }
  return arr
}




const arrays: number[] = [12, 3, 424, 213, 31, 31, 313, 123]

console.log(bubbling(arrays))