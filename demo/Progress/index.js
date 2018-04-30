/**
 * @file Progress
 * @author pashangshangpo
 * @createTime 2018年4月30日 下午5:15
 */

import Progress from '../../component/Progress'
import { el, Log } from '../../common'

const log = new Log('Progress')

export default () => {
  return el(
    Progress,
    {
      percent: 10
    }
  )
}
