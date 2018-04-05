/**
 * @file 创建元素工具
 * @author pashangshangpo
 */

import React from 'react'
import c from './c'

/**
 * 快捷创建元素
 * 
 * @def: el: tag, prop, children => Element
 *  tag: [String, ReactElement]
 *  prop: Object
 *  children: [String, ReactElement]
 */
export default (tag, prop, ...children) => {
  if (['input', 'textarea'].indexOf(tag) > -1) {
    return React.createElement(tag, prop)
  }

  return React.createElement(tag, prop, children)
}
