/**
 * @file Button测试用例
 * @author pashangshangpo
 */

import React from 'react'
import Button from '../component/Button'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import el from '../common/el'

describe('Button测试用例', () => {
  const onClick = sinon.spy()

  let wrapper = shallow(el(
    Button,
    {
      className: 'test-primary',
      type: 'primary',
      loading: true,
      onClick
    },
    'primary-content'
  ))

  it('用户传递的className是否被应用', () => {
    expect(wrapper.find('.test-primary').length).toBeTruthy()
  })

  it('Button类型是否被正确应用', () => {
    expect(wrapper.find('.primary').length).toBeTruthy()
  })

  it('loading是否被正确应用', () => {
    expect(wrapper.find('.loading').length).toBeTruthy()
  })

  it('onClick事件是否被正确触发', () => {
    wrapper.simulate('click')
    expect(onClick.calledOnce).toBeTruthy()
  })

  it('子节点是否正常', () => {
    expect(wrapper.text().indexOf('primary-content') > -1).toBeTruthy()
  })

  it('测试类型边界', () => {
    let wrapper = shallow(el(
      Button,
      {
        type: 'aaaa'
      },
      'aaa'
    ))

    expect(wrapper.html()).toBe(null)
  })
})
