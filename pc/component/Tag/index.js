/**
 * @file Tag组件
 * @author pashangshangpo
 */

import {
  el,
  c
} from '../../../common'
import React, {Component} from 'react'

export default class extends Component {
  /**
   * @def-start: Tag: props, children => Tag
   *  props: Object
   *    className: String
   *    color: String 颜色
   *    isRemove: Boolean 是否可以删除
   *    remove: item => {} 删除时的回调函数
   *  children: [String, ReactElement] tag内容
   */
  static defaultProps = {
    className: '',
    color: '',
    isRemove: false,
    remove: item => {}
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'tag'
        })
      },
      '哈哈哈哈哈'
    )
  }
}
