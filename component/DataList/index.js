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
   */
  defaultProps = {
    className: '',
    data: [],
    activeIndex: -1,
    onHover: () => {},
    onClick: () => {}
  }

  state = {
    hoverIndex: -1
  }

  changeState = state => {
    for (let key of Object.keys(state)) {
      this.state[key] = state[key]
    }

    this.setState(this.state)
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

  renderTitle = title => {
    return el(
      'div',
      {
        className: 'title'
      },
      title
    )
  }

  renderList = data => {
    return el(
      'ul',
      {
        className: 'list',
        onMouseLeave: this.handleMouseLeave
      },
      data.map((content, index) => {
        return el(
          'li',
          {
            'data-index': index,
            key: index,
            className: c({
              default: {
                hover: index === this.state.hoverIndex || index === this.props.activeIndex
              }
            }),
            onMouseEnter: this.handleMouseEnter,
            onClick: this.handleClick
          },
          content
        )
      })
    )
  }

  renderData = () => {
    return this.props.data.map((item, index) => {
      return el(
        'div',
        {
          className: 'section'
        },
        this.renderTitle(item.title),
        this.renderList(item.data)
      )
    })
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
      this.renderData()
    )
  }
}