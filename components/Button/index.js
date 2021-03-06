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
        className: 'button-icon'
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
        className: 'button-loading',
        icon: require('../../image/icon-loading.svg')
      }
    )
  }

  renderMain = () => {
    return el(
      'div',
      {
        className: c({
          default: {
            [`button-${this.props.className}`]: true,
            [`button-${this.props.type}`]: true,
            buttonDisabled: this.props.disabled,
            buttonLoading: this.props.loading
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

  render() {
    if (['default', 'primary', 'dashed'].indexOf(this.props.type) < 0) {
      return null
    }

    return this.renderMain()
  }
}
