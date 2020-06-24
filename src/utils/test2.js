// 缓存代理
export const testFn = () => {
  const getFib = (number) => {
    if (number <= 2) {
      return 1
    } else {
      return getFib(number - 1) + getFib(number - 2)
    }
  }

  const getCacheProxy = (fn, cache = new Map()) => {
    return new Proxy(fn, {
      apply(target, context, args) {
        console.log('getCacheProxy: ', target, context, args, cache)
        const argsString = args.join(' ')
        if (cache.has(argsString)) {
          // 如果有缓存,直接返回缓存数据
          console.log(`输出${args}的缓存结果: ${cache.get(argsString)}`)

          return cache.get(argsString)
        }
        const result = fn(...args)
        cache.set(argsString, result)
        console.log(`结果: ${cache.get(argsString)}`)
        return result
      }
    })
  }

  const getFibProxy = getCacheProxy(getFib)
  getFibProxy(40) // 102334155
  getFibProxy(40) // 输出40的缓存结果: 102334155
}
