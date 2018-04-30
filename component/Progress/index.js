/**
 * @file Progress
 * @author pashangshangpo
 * @createTime 2018年4月30日 下午5:03
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Progress: props => Progress
   *  props: Object
   *    className: String
   */
  static defaultProps = {
    className: '',
    style: {},
    type: 'line',
    percent: 0,
    text: percent => `${percent}%`
  }

  types = {
    line: () => {
      return [
        el(
          'div',
          {
            className: 'line-box'
          },
          el(
            'div',
            {
              className: 'line-top',
              style: {
                width: `${this.props.percent}%`
              }
            }
          )
        ),
        el(
          'div',
          {
            className: 'line-text'
          },
          this.props.text(this.props.percent)
        )
      ]
    }
  }

  renderMain = () => {
    const type = this.types[this.props.type]

    if (!type) {
      return null
    }

    return type()
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'progress'
        }),
        style: this.props.style
      },
      this.renderMain()
    )
  }
}
