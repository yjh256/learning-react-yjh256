// 엔자임을 통한 star component 테스트
import { shallow } from 'enzyme'
import Star from '../../../src/components/ui/Star'

describe("<Star /> UI Component", () => {

  it("renders default star", () =>
    expect(
      shallow(<Star />)
        .find('div.star')
        .length
    ).toBe(1)
  )

  it("render selected star", () =>
    expect(
      shallow(<Star selected={true} />)
        .find('div.selected.star')
        .length
    ).toBe(1)
  )

  it("invokes onClick", () => {

    const _click = jest.fn()
    shallow(<Star onClick={_click}) />)
      .find('div.star')
      .simulate('click')

    expect(_click).toBeCalled()
  })
})
