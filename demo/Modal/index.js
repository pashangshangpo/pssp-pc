/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import Modal from '../../component/Modal'
import { el, Log } from '../../common'

const log = new Log('Modal')

export default class extends Component {
  state = {
    confirmLoading: false
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  handleOk = () => {
    log.message('ok')

    this.changeState({
      confirmLoading: true
    })

    setTimeout(() => {
      this.changeState({
        confirmLoading: false
      })
    }, 2000)
  }

  render() {
    return el(
      Modal,
      {
        visible: true,
        maskClosable: true,
        // closable: false,
        confirmLoading: this.state.confirmLoading,
        // header: null,
        // footer: null,
        onOk: this.handleOk,
        onClose: () => {
          log.message('close')
        },
        onCancel: () => {
          log.message('cancel')
        }
      }
    )
  }
}
