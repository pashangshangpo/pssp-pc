/**
 * @file 数据列表展示
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: DataList: props => DataList
   *  props: Object
   *    className: String
   *    title: String 标题
   *    data: Array [Item]
   *      Item: Object
   *        title: String 标题
   *        data: Array [Item] 数据列表
   *          Item: Object
   *            content [String, ReactElement] 会被当做内容显示
   *    activeIndex: Number 默认选中项
   *    hoverTitle: Boolean 是否hover上去显示完整标题
   *    showLineNumber: Boolean 是否显示行号
   *    onHover: (index, data, e) => * hover事件
   *      index: Number 行号 从0开始
   *      data: Array 传递的data数据
   *      e: Object event对象
   *    onClick: (index, data, e) => * click事件
   *      index: Number 行号 从0开始
   *      data: Array 传递的data数据
   *      e: Object event对象
   */
  static defaultProps = {
    className: '',
    title: '',
    data: [],
    activeIndex: -1,
    hoverTitle: false,
    showLineNumber: false,
    onHover: () => { },
    onClick: () => { }
  }

  state = {
    hoverIndex: -1,
    data: []
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
  }

  componentWillMount() {
    let data = this.props.data
    if (this.props.showLineNumber) {
      data = [
        {
          title: '#',
          data: data[0].data.map((item, index) => {
            return { content: index + 1 }
          })
        }
      ].concat(data)
    }

    this.changeState({ data })
  }

  handleClick = e => {
    const index = Number(e.currentTarget.dataset.index)
    this.props.onClick(index, this.props.data, e)
  }

  handleMouseEnter = e => {
    const index = Number(e.currentTarget.dataset.index)

    this.changeState({
      hoverIndex: index
    })

    this.props.onHover(index, this.props.data, e)
  }

  handleMouseLeave = e => {
    this.changeState({
      hoverIndex: -1
    })
  }

  renderTitle = () => {
    const title = this.props.title

    if (!title) {
      return null
    }

    return el(
      'h3',
      {
        key: 'title',
        className: 'data-list-title'
      },
      title
    )
  }

  renderHeader = title => {
    return el(
      'div',
      {
        key: title,
        className: 'data-list-header'
      },
      title
    )
  }

  renderLi = data => {
    return data.map((item, index) => {
      let title = ''
      if (this.props.hoverTitle && typeof item.content === 'string') {
        title = item.content
      }

      return el(
        'li',
        {
          title,
          key: index,
          className: c({
            default: {
              dataListHover: index === this.state.hoverIndex || index === this.props.activeIndex
            }
          }),
          'data-index': index,
          onMouseEnter: this.handleMouseEnter,
          onClick: this.handleClick,
        },
        item.content
      )
    })
  }

  renderList = (data, index) => {
    return el(
      'ul',
      {
        key: index,
        className: 'data-list-list',
        onMouseLeave: this.handleMouseLeave
      },
      this.renderLi(data)
    )
  }

  renderData = () => {
    return this.state.data.map((item, index) => {
      return el(
        'div',
        {
          key: index,
          className: c({
            default: {
              dataListSection: true,
              dataListLineNumber: this.props.showLineNumber && index === 0
            }
          })
        },
        this.renderHeader(item.title),
        this.renderList(item.data, index)
      )
    })
  }

  renderMain = () => {
    return el(
      'div',
      {
        key: 'main',
        className: 'data-list-main'
      },
      this.renderData()
    )
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'data-list'
        })
      },
      this.renderTitle(),
      this.renderMain()
    )
  }
}
