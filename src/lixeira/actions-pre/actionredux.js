// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
// const LOAD = 'redux-form-examples/account/LOAD'
const LOAD = 'randevous/TRAILING_COMA_DASH'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.data
      }
    default:
      return state
  }
}

/**
 * Simulates data loaded into this reducer from somewhere
 */
export const load = data => ({ type: LOAD, data })

export default reducer