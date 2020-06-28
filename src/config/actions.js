import {constantsStore} from "./store";

// GLOBAL
export const RESET = 'RESET'

// MATRIX
export const CHECKER = 'CHECKER'
export const OVERLAYON = 'OVERLAYON'
export const OVERLAYOFF = 'OVERLAYOFF'
export const NEWGAME = 'NEWGAME'
export const WIN = 'WIN'
export const LOSE = 'LOSE'

export const SETCOLUMN = 'SETCOLUMN'
export const SETROW = 'SETROW'

// ZONE
export const MINE = 'MINE'
export const HIDE = 'HIDE'
export const SHOW = 'SHOW'
export const HIGHLIGHT = 'HIGHLIGHT'
export const INCREMENTNEIGHBOURHOOD = 'INCREMENTNEIGHBOURHOOD'


// Statics functions
/**
 * Get all 8 (or less) neighbourhood of a zone
 * @param {Number} pos
 * @returns {[]} 1..8 zone position
 */
export function neighbourhood(pos) {
    let neighbourhood = []

    let column = constantsStore.getState().column
    let row = constantsStore.getState().row

    let topBound = (pos >= column)
    let rightBound = (pos % column !== column - 1)
    let bottomBound = (pos < column * (row - 1))
    let leftBound = (pos % column !== 0)

    // Top
    if (topBound && leftBound) {
        neighbourhood.push(pos - column - 1)
    }
    if (topBound) {
        neighbourhood.push(pos - column)
    }
    if (topBound && rightBound) {
        neighbourhood.push(pos - column + 1)
    }

    // Bottom
    if (bottomBound && leftBound) {
        neighbourhood.push((pos + column) - 1)
    }
    if (bottomBound) {
        neighbourhood.push(pos + column)
    }
    if (bottomBound && rightBound) {
        neighbourhood.push(pos + column + 1)
    }

    // Left and Right
    if (leftBound) {
        neighbourhood.push(pos - 1)
    }
    if (rightBound) {
        neighbourhood.push(pos + 1)
    }

    return neighbourhood
}