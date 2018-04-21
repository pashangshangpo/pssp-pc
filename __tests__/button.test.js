/**
 * @file Button测试用例
 * @author pashangshangpo
 */

import React from 'react'
import Button from '../component/Button'
import { shallow } from 'enzyme'
import el from '../common/el'
import '../enzyme.adapter'

describe('Button测试用例', () => {
  let wrapper = shallow(el(
    Button,
    {
      className: 'test-primary',
      type: 'primary',
      loading: true,
      onClick: e => {
        console.log('onClick')
      }
    },
    'primary-content'
  ))

  it('用户传递的className是否被应用', () => {
    expect(wrapper.find('.test-primary').length).toEqual(1)
  })

  it('loading是否被应用', () => {
    // expect(wrapper.find('.loading').length).toEqual(1)
    console.log(wrapper.html())
  })
})
