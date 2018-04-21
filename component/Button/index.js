/**
 * @file 按钮组件
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import {el, c} from '../../common'
import Svg from '../Svg'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Button: props => Button
   *  props: Object
   *    className: String
   *    type: String => ['default', 'primary', 'dashed']
   *    loading: Boolean 是否加载中
   *    disabled: Boolean 是否禁用
   *    onClick: e => * 按钮点击事件
   */
  static defaultProps = {
    className: '',
    type: 'default',
    loading: false,
    disabled: false,
    // icon: '',
    onClick: e => {}
  }

  handleClick = e => {
    if (!this.props.disabled) {
      this.props.onClick(e)
    }
  }

  renderIcon = () => {
    const icon = this.props.icon
    if (!icon) {
      return null
    }

    return el(
      Svg,
      {
        className: 'icon'
      }
    )
  }

  renderLoading = () => {
    if (!this.props.loading) {
      return null
    }

    return el(
      Svg,
      {
        key: 'loading',
        className: 'loading',
        icon: require('../../image/icon-loading.svg')
      }
    )
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: {
            [this.props.className]: true,
            [this.props.type]: true,
            disabled: this.props.disabled,
            loading: this.props.loading
          },
          prefix: 'button'
        }),
        onClick: this.handleClick
      },
      this.renderLoading(),
      // this.renderIcon(),
      this.props.children
    )
  }
}
