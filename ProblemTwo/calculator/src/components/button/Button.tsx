import React from 'react'
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    useWindowDimensions,
} from 'react-native'
import { COLORS } from '@/constants'

type ButtonVariant = 'number' | 'action' | 'operator' | 'equal'

interface Props {
    label: string
    variant: ButtonVariant
    onPress: () => void
    wide?: boolean
    active?: boolean
}

const H_PADDING = 14 * 2
const GAP = 6
const COLUMNS = 4

export const CalcButton = ({ label, variant, onPress, wide = false, active = false }: Props) => {
    const { width } = useWindowDimensions()
    const SIZE = (width - H_PADDING - GAP * (COLUMNS - 1)) / COLUMNS

    const btnStyle: (ViewStyle | undefined)[] = [
        styles.btn,
        { width: wide ? SIZE * 2 + GAP : SIZE, height: SIZE },
        styles[variant],
        active ? styles.opActive : undefined,
    ]

    const txtStyle: (TextStyle | undefined)[] = [
        styles.txt,
        styles[`txt_${variant}` as keyof typeof styles] as TextStyle,
        active ? styles.txtOpActive : undefined,
        wide ? styles.txtWide : undefined,
    ]

    return (
        <TouchableOpacity style={btnStyle} onPress={onPress} activeOpacity={0.7}>
            <Text style={txtStyle}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: { backgroundColor: COLORS.darkGrey },
    action: { backgroundColor: COLORS.grey },
    operator: { backgroundColor: COLORS.orange },
    equal: { backgroundColor: COLORS.orange },
    opActive: { backgroundColor: COLORS.white },
    txt: { fontSize: 28, fontWeight: '400', color: COLORS.white },
    txt_action: { color: COLORS.black },
    txt_operator: { color: COLORS.white },
    txt_equal: { color: COLORS.white },
    txtOpActive: { color: COLORS.orange },
    txtWide: { alignSelf: 'flex-start', paddingLeft: 26 },
})
