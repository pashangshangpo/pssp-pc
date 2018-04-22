/**
 * @file Menu
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../../common'
import Svg from '../../Svg'
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
   *        unfoldChildNode: Boolean 是否展开子节点
   *        children: Array [Item] 子节点 可选
   *          Item: ReactElement
   *    checked: * 选中的名称, 如果没有填写默认选中第一个
   *    mode: String 菜单类型 ['vertical', 'horizontal']
   *    onClick: Function 点击子项时触发
   *    onOpenChange: Function 菜单展开关闭时触发
   */
  static defaultProps = {
    className: '',
    style: {},
    data: [],
    checked: '',
    mode: '',
    onClick: () => {},
    onOpenChange: () => {}
  }

  state = {
    data: [],
    checked: this.props.checked
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  componentWillMount() {
    this.changeState({
      data: this.props.data
    })
  }

  handleMenuNameClick = e => {
    const li = e.currentTarget.parentNode
    const index = Array.from(li.parentNode.children).findIndex(item => item === li)
    
    this.toogleChildNode(this.state.data[index])
  }

  handleMenuItemClick = (item, section) => {
    this.changeState({
      checked: item
    })

    this.props.onClick(item, section, this.state.data)
  }

  toogleChildNode = currentMenu => {
    if (currentMenu.children && currentMenu.children.length > 0) {
      currentMenu.unfoldChildNode = !currentMenu.unfoldChildNode

      this.changeState({
        data: this.state.data
      })
    }
    else {
      this.changeState({
        checked: currentMenu.name
      })
    }

    this.props.onOpenChange(currentMenu, this.state.data)
  }

  renderToggleIcon = (isRender, unfoldChildNode) => {
    if (!isRender) {
      return null
    }

    return el(
      Svg,
      {
        className: c({
          default: {
            arrow: true,
            upArrow: unfoldChildNode
          }
        }),
        icon: require('../../../image/icon-down-arrow.svg')
      }
    )
  }

  renderName = section => {
    const name = section.name
    const haveChildNode = section.children && section.children.length > 0

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
        }),
        onClick: this.handleMenuNameClick
      },
      name,
      this.renderToggleIcon(haveChildNode, section.unfoldChildNode)
    )
  }

  renderChildren = section => {
    const {children, unfoldChildNode} = section

    if (!children || children.length < 1) {
      return null
    }

    return el(
      'ul',
      {
        style: {
          height: unfoldChildNode ? 'auto' : '0',
          opacity: unfoldChildNode ? '1' : '0'
        }
      },
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
            }),
            onClick: this.handleMenuItemClick.bind(this, item, section)
          },
          item
        )
      })
    )
  }

  renderMenu = () => {
    return this.state.data.map((section, index) => {
      return el(
        'li',
        {
          key: index
        },
        this.renderName(section),
        this.renderChildren(section)
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
