import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { cleanup } from 'react-testing-library'

import 'jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup)
