/**
 * @file 多选标签
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import Tag from '../Tag'
import './index.less'

export default class extends Component {
  /**
   * @def-start: CheckableTag: props => CheckableTag
   *  props: Object
   *    className: String
   *    data: Array => Tag
   *      Tag => {checked: Boolean, content: [String, ReactElement]}
   *    onChange: tag => * 当更改选中状态时触发, 返回false则不更改状态
   */
  static defaultProps = {
    className: '',
    data: [],
    onChange: tag => { }
  }

  state = {
    data: this.props.data
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }

  handleChange = tag => {
    tag.checked = !tag.checked
    
    if (this.props.onChange(this.state.data.filter(item => item.checked), tag) !== false) {
      this.setState(this.state)
    }
    else {
      tag.checked = !tag.checked
    }
  }

  renderMain = () => {
    return this.state.data.map(tag => {
      return el(
        Tag,
        {
          className: c({
            prefix: {
              tagChexked: tag.checked,
              tagUncheck: !tag.checked
            }
          }),
          onClick: this.handleChange.bind(this, tag)
        },
        tag.content
      )
    })
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'checkable-tag'
        })
      },
      this.renderMain()
    )
  }
}
