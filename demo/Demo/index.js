/**
 * @file Demo
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import ComponentView from '../ComponentView'
import { el, c } from '../../common'
import './index.less'

export default class extends Component {
  /**
   * @start-def: Demo: props => ReactElement
   *  props: Object
   *      className: String
   *      components: Array => Component
   */
  static defaultProps = {
    className: '',
    components: []
  }

  render() {
    return el(
      'div',
      {
        className: c({
          default: this.props.className,
          prefix: 'demo'
        })
      },
      this.props.components.map((item, index) => {
        let demoRef = null

        return el(
          ComponentView,
          {
            key: index,
            name: item.name,
            newPageOpen: item.newPageOpen,
            ref: ref => demoRef = ref
          },
          el(
            item.comp,
            {
              getDemoRef: () => {
                return demoRef
              }
            }
          )
        )
      })
    )
  }
}
