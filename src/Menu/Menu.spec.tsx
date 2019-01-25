import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('A suite', () => {
  let component

  beforeEach(() => {

  })

  it('should add', () => {
    expect(true).toBe(true)
  })
})
