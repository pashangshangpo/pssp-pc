/**
 * @file Info
 * @author pashangshangpo
 */

import React from 'react'
import Svg from '../../Svg'
import Confirm from '../Confirm'
import { el, c } from '../../../common'
import './index.less'

export default class extends Confirm {
  /**
   * @def-start: Info: props => Info
   *  props: Object
   *    title: [ReactElement, String] 标题
   *    content: [ReactElement, String] 内容
   *    okText: String 确认按钮文案
   *    showOk: Boolean 是否显示确认按钮
   *    onOk: Function 确认事件
   */
  static defaultProps = {
    className: c({
      prefix: 'info'
    }),
    title: '',
    content: '',
    okText: 'OK',
    showOk: true,
    onOk: () => {}
  }

  renderIcon = () => {
    return el(
      Svg,
      {
        icon: require('../../../image/icon-info.svg')
      }
    )
  }
}
