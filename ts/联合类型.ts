let myNumber:string | number;
//表示myNumber可以是两种类型之一

// function getLength(something:string | number):number {
//   return something.length
// }

//上例中，length 不是 string 和 number 的共有属性，所以会报错。
function getLengths(something:string | number):string {
  return something.toString()
}
//访问 string 和 number 的共有属性是没问题的：

myNumber = '1'
//此时myNumber会被推断成string
myNumber = 1
//此时myNumber会被推断成number