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
          name: 'Form',
          comp: require('./Form').default
        },
        {
          name: 'Input',
          comp: require('./Input').default
        },
        {
          name: 'Textarea',
          comp: require('./Textarea').default
        },
        {
          name: 'Affix',
          comp: require('./Affix').default
        },
        {
          name: 'Button',
          comp: require('./Button').default
        },
        {
          name: 'ButtonGroup',
          comp: require('./ButtonGroup').default
        },
        {
          name: 'RadioButton',
          comp: require('./RadioButton').default
        },
        {
          name: 'Tag',
          comp: require('./Tag').default
        },
        {
          name: 'MultipleTag',
          comp: require('./MultipleTag').default
        },
        {
          name: 'RadioTag',
          comp: require('./RadioTag').default
        },
        {
          name: 'CheckableTag',
          comp: require('./CheckableTag').default
        },
        
      ]
    }
  )
}
