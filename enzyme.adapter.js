/**
 * @file 适配的配置
 * @author pashangshangpo
 */

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })