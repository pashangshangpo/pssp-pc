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
    visible: false,
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
      'div',
      {},
      el(
        'input',
        {
          type: 'button',
          value: 'show modal',
          onClick: () => {
            this.changeState({
              visible: true
            })
          }
        }
      ),
      el(
        'input',
        {
          type: 'button',
          value: 'show confirm'
        }
      ),
      el(
        Modal,
        {
          visible: this.state.visible,
          maskClosable: true,
          // closable: false,
          confirmLoading: this.state.confirmLoading,
          // header: null,
          // footer: null,
          // showCancel: false,
          // showOk: false,
          onOk: this.handleOk,
          onClose: () => {
            log.message('close')
            // 如果不更改,里面的状态将不会被改变,下次无法被调用
            this.changeState({
              visible: false
            })
          },
          onCancel: () => {
            log.message('cancel')
          }
        }
      )
    )
  }
}
