/**
 * @file AutoComplete
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import AutoComplete from '../../component/AutoComplete'
import { el, Log } from '../../common'

const log = new Log('AutoComplete')

export default class extends Component {
  state = {
    data: []
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  render() {
    return el(
      AutoComplete,
      {
        className: '',
        data: this.state.data,
        onChange: e => {
          const value = e.currentTarget.value
          let selects = []

          if (value.indexOf('@') === -1) {
            selects = ['@gmail.com', '@qq.com', '@163.com'].map(item => `${value}${item}`)
          }

          this.changeState({
            data: selects
          })
        },
        onSelect: content => {
          console.log(content)
        }
      }
    )
  }
}
