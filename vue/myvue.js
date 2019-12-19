//今天撸一下vue双向绑定的原理，众所周知vue2.x及以前是通过Object.defineProperty方法进行数据劫持结合发布订阅者模式完成双向绑定，今天我们自己撸一个小demo
//Object.defineProperty这个方法接受三个参数第一个是需要劫持的对象obj，第二个是该需要劫持对象的某个key值，第三个是该属性的属性描述符
//准备两个工具函数验证数组及对象
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

function isObject(obj) {
  return obj && typeof obj == 'object'
}
function getValue(exp,value,set) { //准备一个工具函数 用来get和set a[b][c] || a.b.c 深层对象属性
  const arr = exp.replace(/\[(.)+?\]/g, function (...params) { //将啊a[b][c] 这种替换为a.b.c
    return `.${params[1]}`
  }).split('.')
  const {length} = arr
  arr.forEach((key,index) => {
    if(set && index === length-1){
      value[key] = set === '\s'?'':set
      // return
    }else{
      value = value[key]
    }
     //遍历取值 [a,b,c]  最终取到a[b][c]
  })
  return value
}
//Object.defineProperty()的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性,所以劫持一个完整的对象我们需要递归遍历
//准备observe类劫持所有数据作为消息中心



const observe = function (obj) {
  this.recursion(obj); //
  this.dep = new dep(); //new 一个自己的订阅器

}
observe.prototype = {
  consuctor: observe,
  define(obj, key, val) {
    //进行递归调用
    const _this = this; //缓存this
    Object.defineProperty(obj, key, {
      get() {
        _this.dep.deppend()
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        _this.dep.nofity()
      },
      configurable: true,
      enumerable: true
    })
    this.recursion(val);

  },
  recursion(obj) {
    if (isObject(obj)) {
      Object.keys(obj).forEach(key => {
        this.define(obj, key, obj[key])
      })

    }

  }

}

//准备一个dep类作为消息订阅器用来通知

const dep = function () {
  this.subs = []; //存储所有的订阅者watcher

}
dep.target = null; //声明一个静态属性用来缓存watcher
dep.prototype = {
  consuctor: dep,
  nofity() { //通知变化更新
    this.subs.forEach(sub => {
      sub.update() //调用所有watcher的update进行更新
    })
  },
  deppend() { //添加依赖
    if (dep.target) {
      this.subs.push(dep.target)
    }
  },

}

//接下来就是准备订阅者watcher
const watcher = function (vm, exp, cb) {
  this.vm = vm; //对象
  this.exp = exp; //自身监听key
  this.cb = cb; //更新触发回调
  this.value = this.get() //缓存旧值
  this.cb.call(this.vm, this.exp, this.value)
}
watcher.prototype = {
  consuctor: watcher,
  get() {
    dep.target = this; //缓存自己
    let value = this.getValue(); //获取触发observe的get 这里可能会是个深度遍历比如a.b.c 或者a[b][c] 这种需要进行递归获取
    dep.target = null;
    return value
  },
  getValue() { //获取最新值
    return getValue(this.exp,this.vm.data)
  },
  update() {
    let value = this.getValue();
    let valueOld = this.value
    if (this.value !== value) { //对新旧值
      this.value = value //缓存旧值
      this.cb.call(this.vm, this.exp, this.value,valueOld) //使用call进行参数的传递
    }
  }
}
// 准备一个模板类解析{{}}双大括号语法及渲染
const compile = function (vm, node) {
  this.node = node;
  console.log(this.node)
  this.vm = vm;
  this.reg = /\{\{(.+?)\}\}/g //准备一个解析{{}}模板的正则
  this.complieList(this.node)
}
compile.prototype = {
  consuctor: compile,
  complieNode(node) {
    if (node.childNodes && node.childNodes.length) {
      return this.complieList(node) //进行递归
    }
   
    if (node.nodeType === 3 && this.reg.test(node.nodeValue)) {
     
      let arr = []
      node.nodeValue.replace(this.reg, function (...params) {
        arr.push(params[1].trim())
      })
      
      node.nodeValue = ''
      arr.forEach(el => {
          new watcher(this.vm, el, (exp, value,valueOld) => {
            if(arr.length > 1){
              if(valueOld){
                let nodeValue = node.nodeValue
                node.nodeValue = nodeValue.replace(new RegExp(valueOld,'g'),value)
                return
              }
              node.nodeValue += value
              return
            }
            node.nodeValue = value
          })
      })

       
    }
    let name;
    if (node.nodeType == 1 && node.nodeName == 'INPUT' && Object.values({ 
        ...node.attributes
      }).some(el => {
        return (el.nodeName == 'v-model') && (name = el.nodeValue) //缓存v-model绑定的值
      })) {
      node.addEventListener('input',  (e) =>{ //监听input框
       getValue(name,this.vm.data,e.target.value || '\s')  
      })
      new watcher(this.vm, name, (name, value) => {
        node.value = value
      })
    }
  },
  complieList(node) {
    [...node.childNodes].forEach(el => {
      this.complieNode(el)
    })
  }
}

function Vue(obj) { //声明Vue类
  this.data = obj.data
  this.proxydl(this, this.data)
  new observe(this.data)
  new compile(this, document.getElementById(obj.el.replace('#', '')))
  obj.created.call(this)
}


Vue.prototype = {
  consuctor: Vue,
  proxy(_this, key, val) { //添加代理 将this.data代理到this上
    Object.defineProperty(_this, key, {
      get() {
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
      },
      configurable: true,
      enumerable: true
    })
    this.proxydl(_this[key], val) 
  },
  proxydl(_this, obj) { //又是一波递归遍历
    if (isObject(obj)) {
      Object.keys(obj).forEach(key => {
        this.proxy(_this, key, obj[key])
      })
    }
  }
}




