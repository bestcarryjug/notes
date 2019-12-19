'use strict'
window.Vue = (function () {
  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

  function isObject(obj) {
    return obj && typeof obj == 'object'
  }
  const observe = function (obj) {
    this.recursion(obj)
    this.Dep = new dep()
  }
  observe.prototype = {
    consuctor: observe,
    define(obj, key, val) {
      let _this = this
      Object.defineProperty(obj, key, {
        get() {
          _this.Dep.depend()
          return val
        },
        set(newVal) {
          if (newVal === val) {
            return
          }
          val = newVal
          _this.Dep.nofity()
        },
        configurable: true,
        enumerable: true
      })
      this.recursion(val)
    },
    recursion(obj) {
      if(isArray(obj)){
        return obj.forEach((item,index) => {
          this.define(obj, index, item)
        })   
      }
      if (!isObject(obj)) {
        return
      }
      Object.keys(obj).forEach(key => {
        this.define(obj, key, obj[key])
      })
    },
    
  }
  const dep = function () {
    this.subs = []
  }
  dep.prototype = {
    consuctor: dep,
    nofity() {
      this.subs.forEach(sub => {
        sub.update()
      })
    },
    addSub(sub) {
      this.subs.push(sub)
    },
    depend() {
      if (dep.target) {
        this.addSub(dep.target)
      }
    }
  }
  dep.target = null;
  let Dep = new dep()
  const watcher = function (vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get()
    this.cb.call(this.vm, this.exp, this.value)
  }

  watcher.prototype = {
    consuctor: watcher,
    update() {
      let value = this.getvalue()
      if (this.value !== value) {
        this.value = value
        this.cb.call(this.vm, this.exp, this.value)
      }
    },
    get() {
      dep.target = this;
      let value = this.getvalue()
      dep.target = null
      return value
    },
    getvalue() {
      let value = this.vm.data
      this.exp.replace(/\[(.+?)\]/g, function (...params) {
        return `.${params[1]}`
      }).split('.').forEach(key => {
        value = value[key]
      })
      return value
    }
  }


  const complie = function (node, vm) {
    this.reg = /\{\{(.+?)\}\}/g
    this.vm = vm
    this.node = node;
    this.complieList(this.node)
  }
  complie.prototype = {
    consuctor: complie,
    complieNode(node) {
      if (node.childNodes && node.childNodes.length) {
        return this.complieList(node)
      }
      if (node.nodeType == 3 && this.reg.test(node.nodeValue)) {
        let arr = [];
        node.nodeValue.replace(this.reg, function (...params) {
          arr.push(params[1].trim())
        })
        node.nodeValue = ''
        arr.forEach(el => {
          new watcher(this.vm, el, (el, value) => {
            arr.length > 1 ?
              node.nodeValue += value : node.nodeValue = value
          })
        })
      }
      let name;
      if (node.nodeType == 1 && node.nodeName == 'INPUT' && Object.values({
          ...node.attributes
        }).some(el => {
          return (el.nodeName == 'v-model') && (name = el.nodeValue)
        })) {
        let _this = this
        node.addEventListener('input', function (e) {
          let value = e.target.value
          _this.vm.data[name] = value
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
  const Vue = function (obj) {
    this.data = obj.data
    this.proxyList(this.data, this) //代理 
    new observe(this.data) //劫持观察者
    new complie(document.getElementById(obj.el.replace('#', '')), this) //dom树遍历解析数据及指令
    obj.created.call(this)
  }
  Vue.prototype = {
    consuctor: Vue,
    proxy(_this, key, val) {
      Object.defineProperty(_this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return val
        },
        set(newVal) {
          if (val === newVal) {
            return
          }
          val = newVal
        }
      })
      this.proxyList(val, _this[key])
    },
    proxyList(obj, _this) {
      if (!isObject(obj)) {
        return
      }
      Object.keys(obj).forEach(key => {
        this.proxy(_this, key, obj[key])
      })
    },
  }
  return Vue
})()

