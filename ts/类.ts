
//public 公有属性
class Animal {
  public name;
  public constructor(name) {
    this.name = name
  }
}
let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom

//private 修饰的属性或方法是私有的，不能在声明它的类的外部访问

class Animals {
  private name;
  public constructor(name) {
    this.name = name
  }
}
let b = new Animals('Jack');
// console.log(b.name); // 报错
// b.name = 'Tom';      //报错
// console.log(b.name); // 报错


//protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

class Animalss {
  protected name;
  public constructor(name) {
    this.name = name
  }
}

class son extends Animalss{
  public constructor(name) {
    super(name)
    console.log(this.name)
  }
}

//private标记构造函数
class Animall {
  public name;
  private constructor(name) {
    this.name = name
  }
}

//当构造函数修饰为 private 时，该类不允许被继承或者实例化

//protected标记构造函数
class Animalll {
  public name;
  protected constructor(name) {
    this.name = name
  }
}
//可以被继承依旧不能实例化

//简洁的定义参数
class Animallll {
  protected constructor( public name) { //表示name是公有属性
    this.name = name
  }
}

//只读readonly
class Animalllll {
    public constructor( public readonly name) { //表示name是公有只读属性 写在public/private/protected 后面
    this.name = name
  }
}

//抽象类abstract关键字声明

abstract class Father{
  public constructor(public name){
    this.name = name
  }
  public abstract siha();
}
//1:不可实例化
//2:子类必须实现父类抽象方法 如下
class Sonss extends Father{
  public constructor(public name){
    super(name)
  }
  public siha(){
    console.log(this.name)
  }
}

//类型
class Animallllls {
  public constructor( public readonly name) { 
  this.name = name
}
}
let ani:Animallllls = new Animallllls('tom')



