/**
 * @file Confirm
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import Modal from '../Modal'
import Button from '../../Button'
import { el, c } from '../../../common'
import './index.less'

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
    okText: 'OK',
    cancelText: 'Cancel',
    onOk: () => {},
    onCancel: () => {}
  }

  handleCancel = () => {

  }

  handleOk = () => {

  }

  renderIcon = () => {
    return el(
      'div',
      {}
    )
  }

  renderTitle = () => {
    return el(
      'div',
      {
        className: 'title'
      },
      this.renderIcon(),
      el(
        'h3',
        {},
        this.props.title
      )
    )
  }

  renderContent = () => {
    return el(
      'div',
      {
        className: 'content'
      },
      this.props.content
    )
  }

  renderBtns = () => {
    return el(
      'div',
      {
        className: 'btns'
      },
      el(
        Button,
        {
          onClick: this.handleCancel
        },
        this.props.cancelText
      ),
      el(
        Button,
        {
          type: 'primary',
          onClick: this.handleOk
        },
        this.props.okText
      )
    )
  }

  renderMain = () => {
    return el(
      'div',
      {
        className: 'confirm-main'
      },
      this.renderTitle(),
      this.renderContent(),
      this.renderBtns()
    )
  }

  render() {
    return el(
      Modal,
      {
        className: c({
          default: this.props.className,
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
