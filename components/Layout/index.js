/**
 * @file Layout
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import './index.less'

import Sider from './Sider'
import Menu from './Menu'
import Content from './Content'

export default class extends Component {
  /**
   * @def-start: Layout: props => Layout
   *  props: Object
   *    className: String
   *    style: Object
   *  children: ReactElement
   */
  static defaultProps = {
    className: '',
    style: {}
  }

  static Sider = Sider

  static Menu = Menu

  static Content = Content

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'layout'
        }),
        style: this.props.style
      },
      this.props.children
    )
  }
}
