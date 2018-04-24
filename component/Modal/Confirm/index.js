/**
 * @file Confirm
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import Base from '../Base'
import { el, c } from '../../../common'
// import './index.less'

export default class extends Component {
  /**
   * @def-start: : props => 
   *  props: Object
   *    className: String
   */
  static defaultProps = {
    className: '',
    title: '',
    content: '',
    onOk: () => {},
    onCancel: () => {}
  }

  renderMain = () => {
    return el(
      'div',
      {},
      this.props.title
    )
  }

  render() {
    return el(
      Base,
      {
        className: c({
          prefix: 'confirm'
        }),
        header: null,
        footer: null,
        visible: true,
        main: this.renderMain()
      }
    )
  }
}
