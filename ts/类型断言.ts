
//语法 当我们知道某个值的类型时

//1.<类型>值

//我们访问 value的长度时 length并不是number|string的公有属性 会报错 此时需要类型断言 表示我知道你是某某类型时 但是不可切换至联合类型中不存在的类型 不是类型转换
function str(value:number|string):number|string {
  if((<string>value).length){
    return (<string>value).length
  }
  return value.toString().length
}

//2:值 as 类型  jsx仅支持这种写法

function strs(value:number|string):number|string {
  if((value as string).length){
    return(value as string).length
  }
  return value.toString().length
}


