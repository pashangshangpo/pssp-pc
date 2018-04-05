/**
 * @file Tag组件
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import {
  el,
  c
} from '../../../common'
import './index.less'

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
    remove: item => { }
  }

  render() {
    const { className, color } = this.props

    return el(
      'div',
      {
        className: c({
          default: {
            [className]: true,
            color: !!color
          },
          prefix: {
            tag: true,
            tagColor: true
          }
        }),
        style: {
          backgroundColor: color
        }
      },
      '哈哈哈'
    )
  }
}
