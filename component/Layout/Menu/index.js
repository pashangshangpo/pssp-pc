/**
 * @file Menu
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Menu: props => Menu
   *  props: Object
   *    className: String
   *    style: Object
   *    data: Array [Item]
   *      Item: Object
   *        name: String 名称
   *        icon: String 图标 暂不支持
   *        children: Array [Item] 子节点 可选
   *          Item: ReactElement
   *    checked: * 选中的名称, 如果没有填写默认选中第一个
   */
  static defaultProps = {
    className: '',
    style: {},
    data: [],
    checked: ''
  }

  state = {
    checked: this.props.checked
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  componentWillMount() {
    let checked = this.props.checked

    if (!checked) {
      const first = this.props.data[0]

      if (first.children && first.children.length > 0) {
        checked = first.children[0]
      }
      else {
        checked = first.name
      }
    }

    this.changeState({checked})
  }

  renderName = (name, haveChildNode) => {
    return el(
      'div',
      {
        key: name,
        className: c({
          default: {
            menuName: true,
            haveChildNode,
            checked: this.state.checked === name
          }
        })
      },
      name
    )
  }

  renderChildren = children => {
    if (!children || children.length < 1) {
      return null
    }

    return el(
      'ul',
      {},
      children.map((item, index) => {
        return el(
          'li',
          {
            key: index,
            className: c({
              default: {
                menuItem: true,
                checked: this.state.checked === item
              }
            })
          },
          item
        )
      })
    )
  }

  renderMenu = () => {
    return this.props.data.map((section, index) => {
      return el(
        'li',
        {
          key: index
        },
        this.renderName(section.name, section.children && section.children.length > 0),
        this.renderChildren(section.children)
      )
    })
  }

  renderMain = () => {
    return el(
      'ul',
      {
        key: 'layout-menu-main'
      },
      this.renderMenu()
    )
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'layout-menu'
        }),
        style: this.props.style
      },
      this.renderMain()
    )
  }
}
