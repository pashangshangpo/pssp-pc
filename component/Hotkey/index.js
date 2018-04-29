/**
 * @file Hotkey
 * @author pashangshangpo
 * @createTime 2018年4月29日 下午4:09
 */

import React, { Component } from 'react'
import { el } from '../../common'

export default class extends Component {
  /**
   * @def-start: Hotkey: props => Hotkey
   *  props: Object
   */
  static defaultProps = {
    event: {}
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    console.log(e.keyCode)
  }

  render() {
    if (!this.props.children) {
      return null
    }

    return this.props.children
  }
}
