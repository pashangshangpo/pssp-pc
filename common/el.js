/**
 * @file 创建元素工具
 * @author pashangshangpo
 */

import React from 'react'
import c from './c'

/**
 * 快捷创建元素
 * 
 * @def: el: element, prop, children => Element
 *  element: [String, ReactElement]
 *  prop: Object
 *  children: [String, ReactElement]
 */
export default (element, prop, children) => {
  return React.createElement(element, prop, children)
}
