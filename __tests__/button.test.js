/**
 * @file Button测试用例
 * @author pashangshangpo
 */

import React from 'react'
import Button from '../component/Button'
import { shallow, mount } from 'enzyme'
import el from '../common/el'
import '../enzyme.adapter'

describe('Button测试用例', () => {
    it('类名是否正确', () => {
        let wrapper = shallow(el(
            Button,
            {
                type: 'primary',
                onClick: e => {
                    console.log('onClick')
                }
            },
            'primary'
        ))
        expect(wrapper.find('.primary').length).toEqual(1);
    });
})
