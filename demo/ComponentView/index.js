/**
 * @file 组件展示
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import {el} from '../../common'
import './index.less'

export default class extends Component {
    /**
     * @start-def: ComponentView: props => ReactElement
     *  props: Object
     *      name: String 组件名称
     *      newPageOpen: Boolean 是否新页面显示
     *  children: Component
     */
    static defaultProps = {
        name: '',
        newPageOpen: false
    }

    state = {
        showComp: ''
    }

    handleTapComp = () => {
        if (this.props.newPageOpen) {
            this.showComp('comp')
        }
    }

    showComp = name => {
        this.state.showComp = name
        this.setState(this.state)
    }

    closeComp = () => {
        this.state.showComp = ''
        this.setState(this.state)
    }

    showCode = () => {
        this.componentString = this.props.children[0].type.toString()
        this.showComp('code')
    }

    renderDefault = () => {
        return el(
            'div',
            {
              className: 'component-main'
            },
            this.props.children
        )
    }

    renderMain = () => {
        switch (this.state.showComp) {
            case 'code':
                return el(
                    'div',
                    {
                      className: 'component-layer'
                    },
                    el(
                        'div',
                        {
                          className: 'component-content'
                        },
                        this.componentString,
                        el(
                          'span',
                          {
                            onClick: this.closeComp,
                            className: 'component-close'
                          },
                          '关闭'
                      )
                    )
                )
            
            case 'comp':
                return el(
                    'div',
                    {
                      className: 'component-layer'
                    },
                    this.props.children,
                    el(
                      'span',
                      {
                        onClick: this.closeComp,
                        className: 'component-close'
                      },
                      '关闭'
                    )
                )
        }

        if (this.props.newPageOpen) {
            return null
        }

        return this.renderDefault()
    }

    render() {
        return el(
            'div',
            {
              className: 'component-view'
            },
            el(
                'h2',
                {
                  className: 'component-title'
                },
                el(
                  'span',
                  {
                    onClick: this.handleTapComp,
                    className: 'component-name'
                  },
                  this.props.name
                ),
                el(
                  'span',
                  {
                    onClick: this.showCode,
                    className: 'component-code-name'
                  },
                  'show code'
                )
            ),
            this.renderMain()
        )
    }
}
