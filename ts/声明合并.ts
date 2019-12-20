// 接口中的属性在合并时会简单的合并到一个接口中：
// interface Alarm {
//     price: number;
// }
// interface Alarm {
//     weight: number;
// }
// 相当于：
// interface Alarm {
//     price: number;
//     weight: number;
// }
// 注意，合并的属性的类型必须是唯一的：
// interface Alarm {
//     price: number;
// }
// interface Alarm {
//     price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错
//     weight: number;
// }
// interface Alarm {
//     price: number;
// }
// interface Alarm {
//     price: string;  // 类型不一致，会报错
//     weight: number;
// }

// // index.ts(5,3): error TS2403: Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.
// 接口中方法的合并，与函数的合并一样：
// interface Alarm {
//     price: number;
//     alert(s: string): string;
// }
// interface Alarm {
//     weight: number;
//     alert(s: string, n: number): string;
// }
// 相当于：
// interface Alarm {
//     price: number;
//     weight: number;
//     alert(s: string): string;
//     alert(s: string, n: number): string;