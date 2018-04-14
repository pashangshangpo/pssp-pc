/**
 * @file log工具
 * @author pashangshangpo
 */

// 前缀
const prefix = 'pssp-log-'
// 上一次log使用的名称
let preLogName = ''

/** 
* @start-def: Log: name, color
*  name: String 名称或message
*  color: String 颜色
*/
const Log = function (name, color) {
  if (this && this.constructor === Log) {
    this.name = name
    this.color = color
  }
  else {
    if (preLogName) {
      console.log('---- end ----')
      console.log('\n')
    }

    // 复杂类型不允许输出颜色
    if (typeof name === 'string') {
      console.log('%c' + name, 'color:' + color)
    }
    else {
      console.log(name)
    }

    preLogName = ''
  }
}

/**
 * @def: .message: ...messages
 *  message: * log信息
 *  输出信息
 */
Log.prototype.message = function (...messages) {  
  if (this.__isOutMessage()) {
    if (preLogName !== this.name) {
      console.log('---- ' + this.name + ' ----')
    }
    
    if (messages.length > 1) {
      console.log.apply(null, messages)
    }
    else {
      const message = messages[0]

      if (typeof message === 'string') {
        console.log('%c' + message, 'color:' + this.color)
      }
      else {
        console.log(message)
      }
    }

    preLogName = this.name
  }
}

/**
 * @def: .hideMessage:
 * 隐藏log
 */
Log.prototype.hideMessage = function () {
  localStorage.setItem(prefix + this.name, 'false')
}

/**
 * @def: .showMessage:
 * 显示log
 */
Log.prototype.showMessage = function () {
  localStorage.setItem(prefix + this.name, 'true')
}

/**
 * @def: .__isOutMessage:
 * 判断是否输出log信息
 */
Log.prototype.__isOutMessage = function () {
  const state = localStorage.getItem(prefix + this.name)
  return state === 'true' || state == null
}

export default Log
