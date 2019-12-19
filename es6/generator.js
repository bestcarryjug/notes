
function  *xx() {
  let fn = ()=>{setTimeout(() => {
      console.log(1211)
  }, 10);
}
  let fnc = ()=>{
    console.log(2222)
  }
  console.log(1111)
  yield fn();
  console.log(2222)
  
}

let gen = xx()
gen.next()

