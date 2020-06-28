import * as actionType from '../../config/actions';

export const initialState = {
    // System evaluation
    overlay: true,
    endgame: 0,
    checked: {},

    // Game variable
    column: 20,
    row: 20,
    zonePixelSize: 40,
    mineNumber: 16,
}

function matrix(state = initialState, action) {
    switch (action.type) {
        case actionType.CHECKER:
            return {...state, checked: {...state.checked, [action.position]: action.position}}

        case actionType.OVERLAYON:
            return {...state, overlay: true}
        case actionType.OVERLAYOFF:
            return {...state, overlay: false}

        case actionType.NEWGAME:
            return {...state, endgame: 0}
        case actionType.WIN:
            return {...state, endgame: 1}
        case actionType.LOSE:
            return {...state, endgame: -1}

        case actionType.SETCOLUMN:
            return {...state, column: action.value}
        case actionType.SETROW:
            return {...state, row: action.value}

        case actionType.RESET:
            return {...initialState, column: state.column, row: state.row, endgame: state.endgame}
        default:
            return state
    }
}

export default matrix
