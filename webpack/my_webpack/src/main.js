import 'css/app.less'
import Vue from 'vue'

document.write('myapp')
document.write('myapp')
const fn  = ()=>{
  console.log('myapp')
}

fn()
console.log(process.env.NODE_ENV)


new Vue({
  el:"#app",
  render(h) {
    
  },
})
