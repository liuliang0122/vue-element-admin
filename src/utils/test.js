
export const initFn = () => {
  const target = {
    name: 'lee',
    info: {
      age: 24
    }
  }

  const isObj = data => {
    return Object.prototype.toString.call(data) === '[object Object]'
  }

  const handler = {
    get(trapTarget, key, receiver) {
      console.log('receiver: ', trapTarget, key, receiver)

      if (!(key in receiver)) {
        throw new Error(`Property ${key} does not exist.`)
      }
      console.log(`监听到了${key}`)

      // 递归调用
      if (isObj(trapTarget[key])) {
        return new Proxy(trapTarget[key], handler)
      }

      console.log('qqq: ', Reflect.get(trapTarget, key, receiver))
      return Reflect.get(trapTarget, key, receiver)
    },
    set(trapTarget, key, value, receiver) {
      console.log(`修改了${key} `, trapTarget, key, value, receiver)
      return Reflect.set(trapTarget, key, value, receiver)
    }
  }

  const observe = data => {
    if (!data || !isObj(data)) {
      return false
    }

    return new Proxy(data, handler)
  }

  const proxyData = observe(target)
  console.log(1111, proxyData.name)
  proxyData.info.age = 30
  console.log(22222, proxyData.info.age)
}

function proxy(vm, key) {
  if (!isReserved(key)) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter() {
        return vm._data[key]
      },
      set: function proxySetter(val) {
        vm._data[key] = val
      }
    })
  }
}

// Object.defineProperty使用
// var arrayMethod = Object.create(Array.prototype);
// ['push', 'shift'].forEach(function (method) {
//   Object.defineProperty(arrayMethod, method, {
//     value: function () {
//       var i = arguments.length
//       var args = new Array(i)
//       while (i--) {
//         args[i] = arguments[i]
//       }
//       var original = Array.prototype[method]
//       var result = original.apply(this, args)
//       console.log("已经控制了，哈哈")
//       return result
//     },
//     enumerable: true,
//     writable: true,
//     configurable: true
//   })
// })
// var bar = [1, 2];
// bar.__proto__ = arrayMethod;
// bar.push(3);//控制台会打印出 “已经控制了，哈哈”;并且bar里面已经成功的添加了成员 ‘3’
