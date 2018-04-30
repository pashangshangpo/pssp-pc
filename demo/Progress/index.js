/**
 * @file Progress
 * @author pashangshangpo
 * @createTime 2018年4月30日 下午5:15
 */

import Progress from '../../component/Progress'
import { el, Log } from '../../common'

const log = new Log('Progress')

export default () => {
  return [
    el(
      'div',
      {},
      'type: line direction: x',
      el(
        Progress,
        {
          percent: 10,
          direction: 'x',
          style: {
            padding: '5px 0'
          }
        }
      )
    ),
    el(
      'div',
      {},
      'type: line direction: y',
      el(
        Progress,
        {
          percent: 30,
          direction: 'y',
          style: {
            height: 100,
            padding: '5px 0',
            margin: '0 auto'
          }
        }
      )
    )
  ]
}
