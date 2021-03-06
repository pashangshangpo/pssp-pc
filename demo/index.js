/**
 * @file demo
 * @author xiaozhihua
 */

import Demo from './Demo'
import el from '../common/el'

export default () => {
  return el(
    Demo,
    {
      components: [
        {
          name: 'Progress',
          comp: require('./Progress').default
        },
        {
          name: 'Hotkey',
          comp: require('./Hotkey').default
        },
        {
          name: 'Affix',
          comp: require('./Affix').default
        },
        {
          name: 'AutoComplete',
          comp: require('./AutoComplete').default
        },
        {
          name: 'Modal',
          comp: require('./Modal').default
        },
        {
          name: 'Layout',
          comp: require('./Layout').default,
          newPageOpen: true
        },
        {
          name: 'DataList',
          comp: require('./DataList').default
        },
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
