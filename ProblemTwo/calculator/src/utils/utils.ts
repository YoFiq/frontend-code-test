import { Operator } from '@/types'

export const formatNum = (num: number): string => {
    if (!isFinite(num)) return 'Error'
    const str = String(num)
    if (str.length > 9) {
        return parseFloat(num.toPrecision(7)).toString()
    }
    return str
}

export const calculate = (a: string, b: string, operator: Operator): number | null => {
    const floatA = parseFloat(a)
    const floatB = parseFloat(b)
    if (operator === '+') {
        return floatA + floatB
    }
    if (operator === '−') {
        return floatA - floatB
    }
    if (operator === '×') {
        return floatA * floatB
    }
    if (operator === '÷') {
        return floatB === 0 ? null : floatA / floatB
    }
    return floatB
}
