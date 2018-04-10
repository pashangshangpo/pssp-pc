/**
 * @file demo
 * @author xiaozhihua
 */

import Demo from './Demo'
import el from '../../common/el'

export default () => {
    return el(
        Demo,
        {
            components: [
                {
                    name: 'Input',
                    comp: require('./Input').default
                }
            ]
        }
    )
}
