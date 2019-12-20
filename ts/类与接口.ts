// //类可以实现接口implements关键字
// interface Alarm {
//     alert();
// }

// class Door {
// }

// class SecurityDoor extends Door implements Alarm {
//     alert() {
//         console.log('SecurityDoor alert');
//     }
// }

// class Car implements Alarm {
//     alert() {
//         console.log('Car alert');
//     }
// }
// // 一个类可以实现多个接口：
// interface Alarm {
//     alert();
// }

// interface Light {
//     lightOn();
//     lightOff();
// }

// class Car implements Alarm, Light {
//     alert() {
//         console.log('Car alert');
//     }
//     lightOn() {
//         console.log('Car light on');
//     }
//     lightOff() {
//         console.log('Car light off');
//     }
// }
// 上例中，Car 实现了 Alarm 和 Light 接口，既能报警，也能开关车灯。
// 接口继承接口
// 接口与接口之间可以是继承关系：
// interface Alarm {
//     alert();
// }

// interface LightableAlarm extends Alarm {
//     lightOn();
//     lightOff();
// }
// 上例中，我们使用 extends 使 LightableAlarm 继承 Alarm。
// 接口继承类
// 接口也可以继承类：
// class Point {
//     x: number;
//     y: number;
// }

// interface Point3d extends Point {
//     z: number;
// }

// let point3d: Point3d = {x: 1, y: 2, z: 3};
// 混合类型
// 之前学习过，可以使用接口的方式来定义一个函数需要符合的形状：
// interface SearchFunc {
//     (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//     return source.search(subString) !== -1;
// }
// 有时候，一个函数还可以有自己的属性和方法：
// interface Counter {
//     (start: number): string;
//     interval: number;
//     reset(): void;
// }

// function getCounter(): Counter {
//     let counter = <Counter>function (start: number) { };
//     counter.interval = 123;
//     counter.reset = function () { };
//     return counter;
// }

// let c = getCounter();
// c(10);
// c.reset();
// c.interval = 5.0;