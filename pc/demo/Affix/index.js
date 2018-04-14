/**
 * @file Affix
 * @author pashangshangpo
 */

import el from '../../../common/el'
import Affix from '../../component/Affix'

export default () => {
  return el(
    Affix,
    {
      className: '',
      target: window,
      offsetTop: 10,
      onChange: isFixed => {
        console.log('Affix', isFixed)
      }
    },
    el(
      'div',
      {},
      '我被固定了'
    )
  )
}
