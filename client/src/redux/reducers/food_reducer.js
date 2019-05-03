export function foodReducer(state = [], action) {
  switch (action.type) {
    case 'SET_FOODS':
      return [
        ...action.payload
      ]
    default: return state;
  }
}