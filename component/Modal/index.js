/**
 * @file Modal
 * @author pashangshangpo
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from './Modal'
import Confirm from './Confirm'
import { el, c } from '../../common'

// export default class Modal extends Component {
//   static confirm = config => render({
//     component: el(
//       Confirm,
//       config
//     )
//   })

//   render() {
//     return ReactDOM.createPortal(
//       el(
//         Base, 
//         this.props,
//         this.props.children
//       ),
//       this.container
//     )
//   }
// }

export default Modal

window.Modal = Modal
