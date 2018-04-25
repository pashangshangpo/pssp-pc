/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import Modal from '../../component/Modal'
import { el, Log } from '../../common'
import './index.less'

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
      {
        className: 'modal'
      },
      el(
        'input',
        {
          type: 'button',
          value: 'modal',
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
          value: 'confirm',
          onClick: () => {
            Modal.confirm({
              title: 'hello confirm',
              content: 'confirm confirm confirm',
              onOk: () => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve()
                    log.message('Modal.confirm', 'onOk')
                  }, 2000)
                })
              },
              onCancel: () => {
                log.message('Modal.confirm', 'onCancel')
              }
            })
          }
        }
      ),
      el(
        'input',
        {
          type: 'button',
          value: 'info',
          onClick: () => {
            Modal.info({
              title: 'hello info',
              content: 'info info info',
              onOk: () => {
                log.message('Modal.info', 'onOk')
              }
            })
          }
        }
      ),
      el(
        'input',
        {
          type: 'button',
          value: 'success',
          onClick: () => {
            Modal.success({
              title: 'hello success',
              content: 'success success success',
              onOk: () => {
                log.message('Modal.success', 'onOk')
              }
            })
          }
        }
      ),
      el(
        'input',
        {
          type: 'button',
          value: 'error',
          onClick: () => {
            Modal.error({
              title: 'hello error',
              content: 'error error error',
              onOk: () => {
                log.message('Modal.error', 'onOk')
              }
            })
          }
        }
      ),
      el(
        'input',
        {
          type: 'button',
          value: 'warning',
          onClick: () => {
            Modal.warning({
              title: 'hello warning',
              content: 'warning warning warning',
              onOk: () => {
                log.message('Modal.warning', 'onOk')
              }
            })
          }
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
