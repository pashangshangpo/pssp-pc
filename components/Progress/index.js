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
   *    style: Object
   *    type: String [line] 类型
   *    percent: Number 进度 一共100份
   *    direction: String [x, y] 方向
   *    text: percent => [ReactElement, String] 显示的文字
   */
  static defaultProps = {
    className: '',
    style: {},
    type: 'line',
    percent: 0,
    direction: 'x',
    text: percent => `${percent}%`
  }

  types = {
    line: {
      renderProgress: () => {
        let lineTopStyle = {
          width: `${this.props.percent}%`
        }
  
        if (this.props.direction === 'y') {
          lineTopStyle = {
            height: `${this.props.percent}%`
          }
        }

        return el(
          'div',
          {
            className: 'line-box'
          },
          el(
            'div',
            {
              className: 'line-top',
              style: lineTopStyle
            }
          )
        )
      },
      renderText: () => {
        const text = this.props.text(this.props.percent)

        if (!text) {
          return null
        }

        return el(
          'div',
          {
            className: 'line-text'
          },
          text
        )
      },
      render: () => {
        return [
          this.types.line.renderProgress(),
          this.types.line.renderText()
        ]
      }
    }
  }

  renderMain = () => {
    const type = this.types[this.props.type]

    if (!type) {
      return null
    }

    return type.render()
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: {
            progressX: this.props.direction === 'x',
            progressY: this.props.direction === 'y'
          }
        }),
        style: this.props.style
      },
      this.renderMain()
    )
  }
}
