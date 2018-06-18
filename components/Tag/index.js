/**
 * @file Tag组件
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import Input from '../Input'
import Svg from '../Svg'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Tag: props, children => Tag
   *  props: Object
   *    className: String
   *    color: String 颜色
   *    isRemove: Boolean 是否可以删除
   *    isAdd: Boolean 是否是新增标签
   *    placeholder: String 作为添加内容时,input输入框的placeholder
   *    onRemove: e => {} 删除时的回调, 返回false时不删除
   *    onClick: e => {} 点击标签时的回调
   *    onAdd: content => {} 添加内容时的回调
   *  children: [String, ReactElement] tag内容
   */
  static defaultProps = {
    className: '',
    color: '',
    isRemove: false,
    isAdd: false,
    placeholder: '',
    onRemove: e => { },
    onClick: e => { },
    onAdd: content => { }
  }

  state = {
    showInput: false,
    remove: false
  }

  handleClick = e => {
    this.props.onClick(e)
  }

  handleInputBlur = e => {
    const value = e.target.value
    if (value) {
      this.addTag(value)
    }
  }

  handleInputKeyDown = e => {
    if (e.keyCode === 13) {
      this.addTag(e.target.value)
    }
  }

  handleRemove = e => {
    e.stopPropagation()
    if (this.props.onRemove(e) !== false) {
      this.state.remove = true
      this.setState(this.state)
    }
  }

  showInput = () => {
    this.state.showInput = true
    this.setState(this.state)
  }

  addTag = value => {
    this.props.onAdd(value)

    this.state.showInput = false
    this.setState(this.state)
  }

  renderAdd = () => {
    return el(
      'div',
      {
        className: c('tag-add'),
        onClick: this.showInput
      },
      this.props.children
    )
  }

  renderInput = () => {
    return el(
      Input,
      {
        type: 'text',
        autoFocus: true,
        placeholder: this.props.placeholder,
        className: c('tag-input'),
        onBlur: this.handleInputBlur,
        onKeyDown: this.handleInputKeyDown
      }
    )
  }

  renderRemove = () => {
    if (!this.props.isRemove) {
      return null
    }

    return el(
      Svg,
      {
        className: 'icon-remove',
        icon: require('../../image/icon-delete.svg'),
        onClick: this.handleRemove
      }
    )
  }

  renderMain = () => {
    const {
      className,
      color,
      children,
      isAdd
    } = this.props

    if (this.state.remove) {
      return null
    }

    if (this.state.showInput) {
      return this.renderInput()
    }

    if (isAdd) {
      return this.renderAdd()
    }

    return el(
      'div',
      {
        className: c({
          default: {
            [className]: true,
            color: !!color
          },
          prefix: {
            tag: true
          }
        }),
        style: {
          backgroundColor: color
        },
        onClick: this.handleClick
      },
      children,
      this.renderRemove()
    )
  }

  render() {
    return this.renderMain()
  }
}
