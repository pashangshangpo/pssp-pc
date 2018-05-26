/**
 * @file 固钉
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import { el, c } from '../../common'
import './index.less'

export default class extends Component {
  /**
   * @def-start: Affix: props => ReactElement
   *  props: Object
   *    className: String
   *    target: [Element, Window] 设置监听其滚动事件的元素，默认为window
   *    offsetTop: Number 距离窗口顶部达到指定偏移量后触发
   *    onChange: isFixed => * 固定状态改变时触发的回调函数	
   */
  static defaultProps = {
    className: '',
    target: window,
    offsetTop: 0,
    onChange: isFixed => { }
  }

  state = {
    fixed: false,
    height: 0
  }

  componentDidMount() {
    this.affixTop = this.affixDom.offsetTop

    this.preFixed = false
    this.state.height = this.getHeight(this.affixDom) + 'px'
    this.setState(this.state)

    this.props.target.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.props.target.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = e => {
    const { target, offsetTop } = this.props

    if (target.scrollY >= (this.affixTop - offsetTop)) {
      if (!this.preFixed) {
        this.handleChange(true)
      }
      this.preFixed = true
      this.state.fixed = true
      this.affixDom.style.top = offsetTop + 'px'
    }
    else {
      if (this.preFixed) {
        this.handleChange(false)
      }

      this.preFixed = false
      this.state.fixed = false
      this.affixDom.style.top = 0 + 'px'
    }

    this.setState(this.state)
  }

  handleChange = isFixed => {
    const affixDom = this.affixDom
    this.props.onChange(isFixed)
  }

  getHeight = dom => {
    const style = getComputedStyle(dom, null)
    return [
      dom.offsetHeight,
      style.marginTop,
      style.marginBottom,
      style.borderBottomWidth,
      style.borderTopWidth
    ].reduce((a, b) => parseFloat(a) + parseFloat(b))
  }

  renderMain = () => {
    return el(
      'div',
      {
        ref: ref => this.affixDom = ref,
        className: c({
          default: {
            [this.props.className]: true,
            affixFixed: this.state.fixed
          },
          prefix: 'affix'
        })
      },
      this.props.children
    )
  }

  render() {
    return el(
      'div',
      {
        style: {
          height: this.state.height
        }
      },
      this.renderMain()
    )
  }
}
