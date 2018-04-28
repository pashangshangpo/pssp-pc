/**
 * @file DataList
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import DataList from '../../component/DataList'
import RadioTag from '../../component/RadioTag'
import { el, Log } from '../../common'
import './index.less'

const log = new Log('DataList')

export default class extends Component {
  state = {
    activeIndex: -1,
    checked: -1,
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  render() {
    return el(
      DataList,
      {
        className: '',
        title: '今日时间花费情况',
        activeIndex: this.state.activeIndex,
        hoverTitle: true,
        showLineNumber: true,
        data: [
          {
            title: '名称',
            data: [{content: '时间管理'}, {content: 'Button测试用例'}]
          },
          {
            title: '花费时间',
            data: [{content: '1小时35分钟'}, {content: '49分钟'}]
          },
          {
            title: '提醒时间',
            data: [true, true].map((item, index) => {
              if (this.state.activeIndex !== -1 && this.state.activeIndex !== index) {
                const radioTag = this[`radiotag-${index}`]
                if (radioTag) {
                  radioTag.changeChecked(-1)
                }
              }

              return {
                content: el(
                  RadioTag,
                  {
                    ref: ref => this[`radiotag-${index}`] = ref,
                    data: [10, 25, 35, 45, 60],
                    checked: -1,
                    onChange: tag => {
                      this.changeState({
                        checked: tag
                      })
                    }
                  }
                )
              }
            })
          }
        ],
        onHover: (index, data, e) => {
          for (let item of data) {
            // log.message('onHover', item.title, item.data[index])
          }
        },
        onClick: (index, data, e) => {
          const target = e.target
          if (target && target.classList.contains('pssp-tag')) {
            this.changeState({
              activeIndex: index
            })
          }
        }
      }
    )
  }
}
