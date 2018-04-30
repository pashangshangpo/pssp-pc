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
  }

  renderMain = () => {

  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'progress'
        })
      },
      this.renderMain()
    )
  }
}
