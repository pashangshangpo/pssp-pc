/**
 * @file Modal
 * @author pashangshangpo
 */

import Modal from '../../component/Modal'
import {el, Log} from '../../common'

const log = new Log('Modal')

export default () => {
  return el(
    Modal,
    {
      visible: true,
      // closable: false
    }
  )
}
