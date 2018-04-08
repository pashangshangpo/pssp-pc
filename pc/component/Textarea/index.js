/**
 * @file Textarea组件
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Textarea: props => ReactElement
   *  props: Object
   *    className: String
   *    value: String
   *    autoFocus: Boolean
   *    placeholder: String
   *    onInput: e => *
   *    onChange: e => *
   * 
   *  默认自适应高度
   */
  static defaultProps = {
    className: '',
    value: '',
    minLine: 1,
    maxLine: Infinity,
    autoFocus: false,
    placeholder: '',
    onInput: e => {},
    onChange: e => {}
  }

  state = {
    value: this.props.value
  }

  componentDidMount() {
    // 初始化时需要重设一下, 否则有内容的话高度会有问题
    
    if (this.props.value) {
      this.resizeHeight(this.textarea)
    }
  }

  onChange = e => {
    const target = e.currentTarget

    this.resizeHeight(target)
    this.props.onInput(e)

    this.state.value = target.value
    this.setState(this.state)

    this.props.onChange(e)
  }

  resizeHeight = el => {
    // 防止无法收回去
    el.style.height = 'auto'

    if (el.scrollHeight >= el.offsetHeight) {
      el.style.height = el.scrollHeight + 'px'
    }
  }

  renderMain = () => {
    return el(
      'textarea',
      {
        ref: ref => this.textarea = ref,
        rows: 1,
        placeholder: this.props.placeholder,
        autoFocus: this.props.autoFocus,
        value: this.state.value,
        className: 'textarea',
        onChange: this.onChange
      }
    )
  }

  render() {
    return el(
      'div',
      {
        className: c({
          defalut: this.props.className,
          prefix: 'textarea'
        })
      },
      this.renderMain()
    )
  }
}
