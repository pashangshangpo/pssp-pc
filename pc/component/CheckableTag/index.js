/**
 * @file 多选标签
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import Tag from '../Tag'
import './index.less'

export default class extends Component {
  static defaultProps = {
    className: '',
    data: [],
    onChange: tag => { }
  }

  state = {
    data: this.props.data
  }

  handleChange = tag => {
    if (this.props.onChange(tag) !== false) {
      tag.checked = !tag.checked
      this.setState(this.state)
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
