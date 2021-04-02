// connect를 사용해 만든 Colors container component
import ColorList from './ColorList'

const mapStateToProps = state =>
  ({
    colors: [...state.colors].sort(sortFunction(state.sort))
  })

const mapDispatchToProps = dispatch =>
  ({
    onRemove(id) {
      dispatch(removeColor(id))
    },
    onRate(id, rating) {
      dispatch(rateColor(id, rating))
    }
  })

export const Colors = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorList)

// connect 함수를 사용한 wrapper component
import { connect } from 'react-redux'
import AddColorForm from './ui/AddColorForm'
import SortMenu from './ui/SortMenu'
import ColorList from './ui/ColorList'
import { addColor,
        sortColor,
        rateColor,
        removeColor } from '../actions'
import { sortFunction } from '../lib/array-helpers'

export const NewColor = connect(
  null,
  dispatch =>
    ({
      onNewColor(title, color) {
        dispatch(addColor(title, color))
      }
    })
)(AddColorForm)

export const Menu = connect(
  state =>
    ({
      sort: state.sort
    }),
  dispatch =>
    ({
      onSelect(sortBy) {
        dispatch(sortColors(sortBy))
      }
    })
)(SortMenu)

export const Colors = connect(
  state =>
    ({
      colors: [...state.colors].sort(sortFunction(state.sort))
    }),
  dispatch =>
    ({
      onRemove(id) {
        dispatch(removeColor(id))
      },
      onRate(id, rating) {
        dispatch(rateColor(id, rating))
      }
    })
)(ColorList)
