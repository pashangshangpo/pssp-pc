/**
 * @file Sider
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Sider: props => Sider
   *  props: Object
   *    className: String
   *  children: ReactElement
   */
  static defaultProps = {
    className: ''
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'layout-sider'
        })
      },
      el(
        'div',
        {
          className: 'sider-children'
        },
        this.props.children
      )
    )
  }
}
