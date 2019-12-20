
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
//一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
interface NoKnow {
  width: string;
  [propName: string]: string;
  age:string; //age:number 会报错
}

//函数类型
interface Fn {
  (key: string, value: number): boolean
}


let func: Fn = function (key: string, value: number): boolean { //函数参数名可以不匹配但是类型得一致
  return !!value

}
//ts 手写一个冒泡排序

const bubbling: (arr: number[]) => number[] = function (arr: number[]): number[] {
  let { length } = arr;
  for (let i = 0; i < length-1; i++) {
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


//冒泡排序终极优化

const mp: (arr: number[]) => number[] = function (arr: number[]): number[] {
  let [left, right, flag, ] = [0, arr.length-1, true]
  while (left < right && flag) {
    flag = false
    for (let i = left; i < right; i++) {
      if(arr[i]>arr[i+1]){
        [arr[i],arr[i+1]] = [arr[i+1],arr[i]]
        flag = true
      }
    }
    right--;
    for (let j = right; j > left; j--) {
      if(arr[j]<arr[j-1]){
        [arr[j],arr[j-1]] = [arr[j-1],arr[j]]
         flag = true
      }
    }
    left++;
  }
  return arr
}

const arrays: number[] = [12, 3, 424, 213, 31, 31, 313, 123]

console.log(bubbling(arrays))
console.log(mp(arrays))

