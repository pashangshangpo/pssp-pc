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
   *    lineHeight: Number 一行的高度
   *    minLine: Number 最小行数
   *    maxLine: Number 最大行数
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
    lineHeight: 22,
    minLine: 2,
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

    this.textarea.style.minHeight = this.props.minLine * this.props.lineHeight + 'px'
    this.textarea.style.maxHeight = this.props.maxLine * this.props.lineHeight + 'px'
  }

  onChange = e => {
    const target = e.currentTarget

    this.resizeHeight(target)

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
        onChange: this.onChange,
        onInput: this.props.onInput
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
