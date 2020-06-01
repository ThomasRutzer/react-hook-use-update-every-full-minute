import { renderHook, act } from '@testing-library/react-hooks'
import MockDate from 'mockdate'
import useUpdateEveryFullMinute from './../src'

const mockDateInit = 'Tue Feb 04 2020 02:22:40 GMT+0100 (GMT+01:00)'
const mockDateNextFullMinute = 'Tue Feb 04 2020 02:23:00 GMT+0100 (GMT+01:00)'
const mockDateMinuteAfterNext = 'Tue Feb 04 2020 02:24:00 GMT+0100 (GMT+01:00)'
const mockDateAfterAfter3Minutes = 'Tue Feb 04 2020 02:25:00 GMT+0100 (GMT+01:00)'
jest.useFakeTimers()

describe('useUpdateEveryFullMinute', () => {
  beforeEach(() => {
    MockDate.set(mockDateInit)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should set the time initially to current datetime as timestamp of seconds', () => {
    const { result } = renderHook(() => useUpdateEveryFullMinute())
    expect(result.current.toString()).toEqual(mockDateInit)
  })

  it('should update current time first time on next full minute', () => {
    const { result } = renderHook(() => useUpdateEveryFullMinute())

    MockDate.set(mockDateNextFullMinute)
    act(() => jest.advanceTimersByTime(20000))

    expect(result.current.toString()).toEqual(mockDateNextFullMinute)
  })

  it('should not update between first full minute and next', () => {
    const { result } = renderHook(() => useUpdateEveryFullMinute())

    MockDate.set(mockDateNextFullMinute)
    act(() => jest.advanceTimersByTime(20000))

    expect(result.current.toString()).toEqual(mockDateNextFullMinute)

    MockDate.set(mockDateNextFullMinute)
    act(() => jest.advanceTimersByTime(30000))

    expect(result.current.toString()).toEqual(mockDateNextFullMinute)
  })

  it('should update every full minute after first update', () => {
    const { result } = renderHook(() => useUpdateEveryFullMinute())

    MockDate.set(mockDateMinuteAfterNext)
    act(() => jest.advanceTimersByTime(100000))

    expect(result.current.toString()).toEqual(mockDateMinuteAfterNext)

    MockDate.set(mockDateAfterAfter3Minutes)
    act(() => jest.advanceTimersByTime(60000))

    expect(result.current.toString()).toEqual(mockDateAfterAfter3Minutes)
  })
})
