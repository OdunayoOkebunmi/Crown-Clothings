import SECTIONS_DATA from './sections.data';
const INITIAL_STATE = {
  section: SECTIONS_DATA
}

const directoryReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
    default:
      return state
  }
}

export default directoryReducer;