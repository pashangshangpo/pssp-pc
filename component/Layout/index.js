/**
 * @file Layout
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import './index.less'

export {default as Sider} from './Sider'
export {default as Menu} from './Menu'
export {default as Content} from './Content'

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
