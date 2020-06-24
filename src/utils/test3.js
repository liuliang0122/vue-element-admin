/**
 * 验证代理
 */
export const testFn3 = () => {
  // 表单对象
  const userForm = {
    account: '',
    password: ''
  }

  // 验证方法
  const validators = {
    account(value) {
      // account 只允许为中文
      const re = /^[\u4e00-\u9fa5]+$/
      return {
        valid: re.test(value),
        error: '"account" is only allowed to be Chinese'
      }
    },
    password(value) {
      // password 的长度应该大于6个字符
      return {
        valid: value.length >= 6,
        error: '"password "should more than 6 character'
      }
    }
  }

  const getValidateProxy = (target, validators) => {
    return new Proxy(target, {
      _validators: validators,
      set(target, prop, value) {
        console.log('getValidateProxy: ', target, prop, value)
        if (value === '') {
          console.error(`"${prop}" is not allowed to be empty`)
          return target[prop] = false
        }
        const validResult = this._validators[prop](value)
        if (validResult.valid) {
          return Reflect.set(target, prop, value)
        } else {
          console.error(`${validResult.error}`)
          return target[prop] = false
        }
      }
    })
  }

  const userFormProxy = getValidateProxy(userForm, validators)
  userFormProxy.account = '张三' // "account" is only allowed to be Chinese
  userFormProxy.password = 'he' // "password "should more than 6 character
  // console.log(userFormProxy, validators.account(userFormProxy.password))
}
