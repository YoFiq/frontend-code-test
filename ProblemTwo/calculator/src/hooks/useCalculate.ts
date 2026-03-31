import { useCallback, useState } from 'react'
import { CalcState, Operator } from '@/types'
import { INIT_CALC_STATE, MAX_CALC_NUMBER_LENGTH } from '@/constants'
import { calculate, formatNum } from '@/utils'

export const useCalculator = () => {
    const [state, setState] = useState<CalcState>(INIT_CALC_STATE)

    const handleNumberPress = useCallback((num: string) => {
        setState((prev) => {
            if (prev.shouldReset) {
                return {
                    ...prev,
                    current: num === '.' ? '0.' : num,
                    shouldReset: false,
                }
            }
            if (num === '.' && prev.current.includes('.')) {
                return prev
            }
            if (prev.current.length >= MAX_CALC_NUMBER_LENGTH) {
                return prev
            }
            const next = prev.current === '0' && num !== '.' ? num : prev.current + num
            return { ...prev, current: next }
        })
    }, [])

    const handleOperatorPress = useCallback((operator: Operator) => {
        setState((prev) => {
            if (prev.operator && !prev.shouldReset) {
                const result = calculate(prev.previous!, prev.current, prev.operator)
                if (result === null) {
                    return { ...INIT_CALC_STATE, current: 'Error' }
                }
                const formatted = formatNum(result)
                return {
                    current: formatted,
                    previous: formatted,
                    operator: operator,
                    shouldReset: true,
                    expression: `${formatted} ${operator}`,
                }
            }
            return {
                ...prev,
                previous: prev.current,
                operator,
                shouldReset: true,
                expression: `${prev.current} ${operator}`,
            }
        })
    }, [])

    const handleEqualPress = useCallback(() => {
        setState((prev) => {
            if (!prev.operator || !prev.previous) {
                return prev
            }
            const result = calculate(prev.previous, prev.current, prev.operator)
            const expression = `${prev.previous} ${prev.operator} ${prev.current} =`
            if (result === null) {
                return { ...INIT_CALC_STATE, current: 'Error', expression }
            }
            const formatted = formatNum(result)
            return {
                current: formatted,
                previous: null,
                operator: null,
                shouldReset: true,
                expression,
            }
        })
    }, [])

    const handleAcPress = useCallback(() => setState(INIT_CALC_STATE), [])

    const pressSign = useCallback(() => {
        setState((prev) => {
            if (prev.current === '0' || prev.current === 'Error') {
                return prev
            }
            const next = prev.current.startsWith('-') ? prev.current.slice(1) : '-' + prev.current
            return { ...prev, current: next }
        })
    }, [])

    const handlePercentPress = useCallback(() => {
        setState((prev) => {
            const val = parseFloat(prev.current) / 100
            return { ...prev, current: formatNum(val) }
        })
    }, [])

    return {
        display: state.current,
        expression: state.expression,
        activeOp: state.operator,
        handleNumberPress,
        handleOperatorPress,
        handleEqualPress,
        handleAcPress,
        pressSign,
        handlePercentPress,
    }
}
