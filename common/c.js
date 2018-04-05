/**
 * @file className工具
 * @author pashangshangpo
 */

/**
 * className工具
 * 
 * @def-start: c: ...className => String
 *  className: String
 * 
 * 会把值为空的和false的过滤掉
 */
export default (...className) => {
  return className.map(c => {
    if (c) {
      return `pssp-${c}`
    }

    return ''
  }).join(' ')
}
