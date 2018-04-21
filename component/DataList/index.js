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
    hoverTitle: false,
    showLineNumber: false,
    onHover: () => {},
    onClick: () => {}
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
          data: data[0].data.map((item, index) => index + 1)
        }
      ].concat(data)
    }

    this.changeState({data})
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
        let title = ''
        if (this.props.hoverTitle) {
          title = content
        }

        return el(
          'li',
          {
            title,
            key: index,
            className: c({
              default: {
                hover: index === this.state.hoverIndex || index === this.props.activeIndex
              }
            }),
            'data-index': index,
            onMouseEnter: this.handleMouseEnter,
            onClick: this.handleClick,
          },
          content
        )
      })
    )
  }

  renderData = () => {
    return this.state.data.map((item, index) => {
      return el(
        'div',
        {
          className: c({
            default: {
              section: true,
              lineNumber: this.props.showLineNumber && index === 0
            }
          })
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
