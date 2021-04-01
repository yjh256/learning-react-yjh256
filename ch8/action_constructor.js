// action 생성기 예제
import C from './constants'

export const removeColor = id =>
  ({
    type: C.REMOVE_COLOR,
    id
  })

export const rateColor = (id, rating) =>
  ({
    type: C.RATE_COLOR,
    id,
    rating
  })

export const sortColors = sortedBy =>
  (sortedBy === "rating") ?
    ({
      type: C.SORT_COLORS,
      sortBy: "SORTED_BY_RATING"
    }) :
    (sortedBy === "title") ?
      ({
        type: C.SORT_COLORS,
        sortBy: "SORTED_BY_TITLE"
      }) :
      ({
        type: C.SORT_COLORS,
        sortBy: "SORTED_BY_DATE"
      })

// action 생성기에 로직을 넣을 수도 있다.
import { v4 } from 'uuid'

export const addColor = (title, color) =>
  ({
    type: C.ADD_COLOR,
    id: v4(),
    title,
    color,
    timestamp: new Date().toString()
  })

// 위 action 생성기를 이용해 action을 간단히 만들 수 있다.
store.dispatch(removeColor(1))
store.dispatch(rateColor(2, 5))
store.dispatch(sortColors("title"))
store.dispatch(addColor("#F142FF", "pink"))
