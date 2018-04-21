import React from 'react'
import { Button } from '../index'
import { shallow, mount } from 'enzyme'
import el from '../../common/el'
import '../../enzyme.adapter'

describe('Button', () => {
    it('Button测试', () => {
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