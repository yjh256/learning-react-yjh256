// __mocks__ 내부의 ColorList.js
const ColorListMock = () => <div className="color-list-mock"></div>

ColorListMock.displayName = "ColorListMock"

export default ColorListMock

// 직접 만든 ColorList mock과 store mock을 이용한 Colors 테스트
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { Colors } from '../../../src/components/containers'

jest.mock('../../../src/components/ui/ColorList')

describe("<Colors /> Container ", () => {
  let wrapper

  const _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() =>
      ({
        sort: "SORTED_BY_DATE",
        colors: _testColors
      })
    )
  }

  beforeAll(() => wrapper = mount(
    <Provider store={_store}>
      <Colors />
    </Provider>
  ))

  it("renders three colors", () => {
    expect(wrapper
      .find('ColorListMock')
      .props()
      .colors
      .length
    ).toBe(3)
  })

  it("sorts the colors by data", () => {
    expect(wrapper
      .find('ColorListMock')
      .props()
      .colors[0]
      .title
    ).toBe("red")
  })

  afterEach(() => jest.resetAllMocks())

  it("dispatches a REMOVE_COLOR action", () => {
    wrapper.find('ColorListMock')
      .props()
      .onRemove('f9005b4e-975e-433d-a646-79df172e1dbb')

    expect(_store.dispatch.mock.calls[0][0])
      .toEqual({
        id: 'f9005b4e-975e-433d-a646-79df172e1dbb',
        type: 'REMOVE_COLOR'
      })
  })

  it("dispatches a RATE_COLOR action", () => {
    wrapper.find('ColorListMock')
      .props()
      .onRemove('58d9caee-6ea6-4d7b-9984-65b145031979', 5)

    expect(_store.dispatch.mock.calls[0][0])
      .toEqual({
        id: '58d9caee-6ea6-4d7b-9984-65b145031979',
        type: 'RATE_COLOR',
        rating: 5
      })
  })
})
