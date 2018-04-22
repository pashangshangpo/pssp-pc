/**
 * @file DataList测试用例
 * @author pashangshangpo
 */

import React from 'react'
import DataList from '../component/DataList'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import el from '../common/el'

describe('DataList测试用例', () => {
  const onClick = sinon.spy()
  const onHover = sinon.spy()

  const config = {
    className: 'data-list-test',
    title: '今日时间花费情况',
    activeIndex: 1,
    hoverTitle: true,
    showLineNumber: true,
    data: [
      {
        title: '名称',
        data: ['时间管理', 'Button测试用例']
      },
      {
        title: '花费时间',
        data: ['1小时35分钟', '49分钟']
      }
    ],
    onHover,
    onClick
  }

  let wrapper = shallow(el(
    DataList,
    config
  ))

  it('用户传递的className是否被应用', () => {
    expect(wrapper.find(`.${config.className}`).length).toBeTruthy()
  })

  it('测试Title是否被显示', () => {
    expect(wrapper.find('.title').text()).toBe(config.title)
  })

  it('测试选中项是否正确', () => {
    expect(wrapper.find('.hover').everyWhere(item => {
      return Number(item.render()[0].attribs['data-index']) === config.activeIndex
    })).toBeTruthy()
  })

  it('测试是否显示行号', () => {
    expect(wrapper.find('.line-number').length).toBeTruthy()
  })

  it('测试hover时title是否被显示', () => {
    let data = []
    config.data.forEach(section => {
      data = data.concat(section.data)
    })

    // 只有字符串才会显示
    expect(wrapper.find('li').everyWhere((item, index) => {
      const len = config.data[0].data.length
      const i = index - len

      if (config.showLineNumber) {
        if (index <= len) {
          return true
        }
      }

      return item.render()[0].attribs['title'] === String(data[i]) || typeof data[i] !== 'string'
    })).toBeTruthy()
  })

  it('测试click事件是否被正确响应', () => {
    wrapper.find('li').at(0).simulate('click', {
      currentTarget: {
        dataset: 0
      }
    })
    
    expect(onClick.calledOnce).toBe(true)
  })

  it('测试hover事件是否被正确响应', () => {
    wrapper.find('li').at(0).simulate('mouseenter', {
      currentTarget: {
        dataset: 0
      }
    })
    
    expect(onHover.calledOnce).toBe(true)
  })
})
