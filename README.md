# pssp-pc
pc端组件库

## 使用示例

```
import React, { Component } from 'react'
import { Button } from 'pssp-pc'

exports default class extends Component {
  render() {
    return (
      <Button
        type={'primary'},
        onClick={e => {
          console.log('primary', e)
        }}
      >primary</Button>
    )
  }
}
```

## 查看所有组件效果和使用示例

```
git clone https://gitee.com/pashangshangpo/pssp-pc.git
yarn start
```
