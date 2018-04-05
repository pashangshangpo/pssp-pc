/**
 * @file className工具
 * @author pashangshangpo
 */

/**
 * className工具
 * 
 * @def-start: c: ...className => String
 *  className: [String, Object]
 * 
 *  如果第一个是对象,则使用如下规则
 *  {
 *    default: [String, Object],
 *    prefix: [String, Object]
 *  }
 * 
 *  Item: {
 *    a: true,
 *    b: false
 *  }
 * 
 *  会把值为空的和false的过滤掉
 */
export default (...className) => {
  const classNameTool = className => {
    return className.map(c => {
      if (c) {
        return `pssp-${c}`
      }
  
      return ''
    }).join(' ')
  }

  const nameObject = className[0]

  if (typeof nameObject === 'object') {
    let className = ''

    if (typeof nameObject.default === 'object') {
      className += Object.keys(nameObject.default).filter(cla => nameObject.default[cla]).join(' ')
    }
    else {
      className += nameObject.default || ''
    }

    if (typeof nameObject.prefix === 'object') {
      className += ' ' + classNameTool(
        Object.keys(nameObject.prefix)
          .filter(cla => nameObject.prefix[cla])
      )
    }
    else {
      className += ' ' + classNameTool([nameObject.prefix])
    }

    return className.trim()
  }

  return classNameTool(className).trim()
}
