/**
 * @file 多标签
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import {el, c} from '../../common'
import Tag from '../Tag'

export default class extends Component {
  /**
   * @def-start: MultipleTag: props, children => MultipleTag
   *  props: Object
   *    className: String
   *    color: String 颜色
   *    isRemove: Boolean 是否可以删除
   *    data: Array => [String, ReactElement] 数据列表
   *    add: Object
   *      text: [String, ReactElement]
   *      placeholder: input提示信息
   *      onAdd: content => {} 添加时的回调, 返回false时不添加
   *    onRemove: e => {} 删除时的回调, 返回false时不删除
   *    onClick: e => {} 点击标签时的回调
   *    onAdd: content => {} 添加内容时的回调
   */
  static defaultProps = {
    className: '',
    color: '',
    isRemove: false,
    add: null,
    data: [],
    onRemove: e => { },
    onClick: e => { }
  }

  state = {
    data: this.props.data
  }

  onAdd = content => {
    if (this.props.add.onAdd(content) !== false) {
      this.state.data.push(content)
      this.setState(this.state)
    }
  }

  renderList = () => {
    const {
      color,
      isRemove,
      onRemove,
      onClick
    } = this.props

    return this.props.data.map(tag => {
      return el(
        Tag,
        {
          color,
          isRemove,
          onRemove,
          onClick
        },
        tag
      )
    })
  }

  renderAdd = () => {
    if (!this.props.add) {
      return null
    }

    const {text, placeholder} = this.props.add

    return el(
      Tag,
      {
        placeholder,
        isAdd: true,
        onAdd: this.onAdd
      },
      text
    )
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'multiple-tag'
        })
      },
      this.renderList(),
      this.renderAdd()
    )
  }
}
