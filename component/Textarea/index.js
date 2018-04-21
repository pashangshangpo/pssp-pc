/**
 * @file Textarea组件
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import './index.less'

export default class extends Component {
  /**
   * @start-def: Textarea: props => ReactElement
   *  props: Object
   *    className: String
   *    value: String
   *    lineHeight: Number 一行的高度
   *    minLine: Number 最小行数
   *    maxLine: Number 最大行数
   *    maxWord: Number 最大字数
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
    minLine: 1,
    maxLine: Infinity,
    maxWord: Infinity,
    autoFocus: false,
    placeholder: '',
    onInput: e => {},
    onChange: e => {}
  }

  state = {
    value: this.props.value,
    word: 0
  }

  componentDidMount() {
    // 初始化时需要重设一下, 否则有内容的话高度会有问题
    
    if (this.props.value) {
      this.resizeHeight(this.textarea)
    }

    this.textarea.style.minHeight = this.props.minLine * this.props.lineHeight + 'px'
    this.textarea.style.maxHeight = this.props.maxLine * this.props.lineHeight + 'px'

    document.addEventListener('mousewheel', this.handleMousewheel)
  }

  componentWillUnmount() {
    document.removeEventListener('mousewheel', this.handleMousewheel)
  }

  handleChange = e => {
    const target = e.currentTarget

    this.resizeHeight(target)

    this.state.value = target.value
    this.state.word = target.value.length
    this.setState(this.state)

    this.props.onChange(e)
  }

  handleMousewheel = e => {
    const target = e.target
    if (document.activeElement === this.textarea && 
      target === this.textarea &&
      target.offsetHeight < target.scrollHeight
    ) {
      if (
        (target.scrollTop === 0 && e.wheelDeltaY >= 0) ||
        (e.wheelDeltaY < 0 && (target.scrollTop + target.offsetHeight) > target.scrollHeight)
      ) {
        e.preventDefault()
      }
    }
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
        onChange: this.handleChange,
        onInput: this.props.onInput
      }
    )
  }

  renderWordMessage = () => {
    if (this.props.maxWord === Infinity) {
      return null
    }

    const currentWord = this.props.maxWord - this.state.word

    return el(
      'div',
      {
        className: 'word'
      },
      el(
        'span',
        {},
        '还可以输入'
      ),
      el(
        'span',
        {
          className: c({
            default: {
              number: true,
              error: currentWord < 0
            }
          })
        },
        currentWord
      ),
      '字'
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
      this.renderMain(),
      this.renderWordMessage()
    )
  }
}
