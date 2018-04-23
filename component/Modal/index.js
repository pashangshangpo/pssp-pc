/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Modal: props => Modal
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
          prefix: 'modal'
        })
      },
      this.renderMain()
    )
  }
}
