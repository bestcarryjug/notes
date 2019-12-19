//简介
//统一处理所有数据结构遍历
let myIterator = (array) => {
  let index = 0;
  return {
    next() {
      return index < array.length?{
        value:array[index++],done:false
      }:{
        value:undefined,done:true
      }
    }
  }
}
// let it = myIterator(['a', 'b'])

//默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，
//一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历
//原生具备 Iterator 接口的数据结构如下。
// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象

let arr = [1,2,3,4]
let it = arr[Symbol.iterator]()
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())

let arr = [];
