/**
 * @file Warning
 * @author pashangshangpo
 */

import React from 'react'
import Svg from '../../Svg'
import Modal from '../Modal'
import Confirm from '../Confirm'
import { el, c } from '../../../common'
import './index.less'

export default class extends Confirm {
  /**
   * @def-start: Warning: props => Warning
   *  props: Object
   *    className: String
   *    style: Object
   *    title: [ReactElement, String] 标题
   *    content: [ReactElement, String] 内容
   *    okText: String 确认按钮文案
   *    showOk: Boolean 是否显示确认按钮
   *    onOk: Function 确认事件
   */
  static defaultProps = {
    className: '',
    style: {},
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
        icon: require('../../../image/icon-warning.svg')
      }
    )
  }

  render() {
    return el(
      Modal,
      {
        className: c({
          default: this.props.className,
          prefix: 'confirm warning'
        }),
        style: this.props.style,
        header: null,
        footer: null,
        visible: true,
        main: this.renderMain()
      }
    )
  }
}
