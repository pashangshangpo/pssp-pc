/**
 * @file DataList
 * @author pashangshangpo
 */

import DataList from '../../component/DataList'
import RadioTag from '../../component/RadioTag'
import { el, Log } from '../../common'
import './index.less'

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
        },
        {
          title: '提醒时间',
          data: [
            el(
              RadioTag,
              {
                data: [10, 25, 35, 45, 60]
              }
            ),
            el(
              RadioTag,
              {
                data: [10, 25, 35, 45, 60]
              }
            )
          ]
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
