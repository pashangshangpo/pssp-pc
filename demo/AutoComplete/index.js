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

          this.changeState({
            data: [1, 2, 3].map(item => new Array(item).fill(value).join(''))
          })
        },
        onSelect: content => {
          console.log(content)
        }
      }
    )
  }
}
