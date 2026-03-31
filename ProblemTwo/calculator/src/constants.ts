import { CalcState } from '@/types'

export const INIT_CALC_STATE: CalcState = {
    current: '0',
    previous: null,
    operator: null,
    shouldReset: false,
    expression: '',
}

export const COLORS = {
    orange: '#ff9f0a',
    white: '#ffffff',
    black: '#1c1c1e',
    grey: '#a5a5a5',
    darkGrey: '#333336',
}

export const MAX_CALC_NUMBER_LENGTH = 14
