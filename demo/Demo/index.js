/**
 * @file Demo
 * @author pashangshangpo
 */

import React, {Component} from 'react'
import ComponentView from '../ComponentView'
import el from '../../../common/el'
import c from '../../../common/c'
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
                return el(
                    ComponentView,
                    {
                        key: index,
                        name: item.name,
                        newPageOpen: item.newPageOpen
                    },
                    el(
                        item.comp,
                        {}
                    )
                )
            })
        )
    }
}
