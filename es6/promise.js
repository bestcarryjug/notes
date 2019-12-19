//用来解决回调地狱
//三个状态:pending（进行中）、fulfilled（已成功）和rejected（已失败）只有结果可以改变状态


const promise = new Promise(function (resolve, reject) {
  // if (/* 异步操作成功 */true){ //这里会立即执行
  //   resolve(value);
  // } else {
  //   reject(error);
  // }

  resolve()

})

promise.then(function (reslove) {
  console.log(222)
}, function (error) {
  console.log(222)
})
// const getJSON = function(url) {
//   const promise = new Promise(function(resolve, reject){
//     const handler = function() {
//       if (this.readyState !== 4) {
//         return;
//       }
//       if (this.status === 200) {
//         resolve(this.response);
//       } else {
//         reject(new Error(this.statusText));
//       }
//     };
//     const client = new XMLHttpRequest();
//     client.open("GET", url);
//     client.onreadystatechange = handler;
//     client.responseType = "json";
//     client.setRequestHeader("Accept", "application/json");
//     client.send();

//   });

//   return promise;
// };

// getJSON("http://appstore.campusphere.net/pluto/app/category/list").then(function(json) {
//   console.log(json);
// }, function(error) {
//   console.error('出错了', error);
// });

console.log(111)

