/**
 * @file 组件DEMO
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import {
  el,
  c
} from '../../../common'
import {
  Tag
} from '../../index'
import './index.less'

export default class extends Component {
  render() {
    return el(
      Tag,
      {
        className: c('demo')
      }
    )
  }
}
