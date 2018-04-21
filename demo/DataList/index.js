/**
 * @file DataList
 * @author pashangshangpo
 */

import DataList from '../../component/DataList'
import { el, Log } from '../../common'

const log = new Log('DataList')

export default () => {
  return el(
    DataList,
    {
      className: '',
      activeIndex: 1,
      hoverTitle: true,
      showLineNumber: true,
      data: [
        {
          title: '姓名',
          data: ['张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三张三', '李四']
        },
        {
          title: '年龄',
          data: [19, 25]
        }
      ],
      onHover: (index, data, e) => {
        for (let item of data) {
          log.message('onHover', item.title, item.data[index])
        }
      },
      onClick: (index, data, e) => {
        log.message('onClick', index, data[0].data[index])
      }
    }
  )
}
