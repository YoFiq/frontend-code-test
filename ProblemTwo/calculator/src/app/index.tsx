import { Text, View, StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import React from 'react'
import { useCalculator } from '@/hooks'
import { CalcButton } from '@/components'

export default function HomeScreen() {
    const {
        display,
        expression,
        activeOp,
        handleNumberPress,
        handleOperatorPress,
        handleEqualPress,
        handleAcPress,
        pressSign,
        handlePercentPress,
    } = useCalculator()

    const fontSize = display.length > 9 ? 36 : display.length > 7 ? 48 : 64

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" />

            <View style={styles.display}>
                <Text style={styles.expression} numberOfLines={1}>
                    {expression}
                </Text>
                <Text style={[styles.current, { fontSize }]} numberOfLines={1} adjustsFontSizeToFit>
                    {display}
                </Text>
            </View>

            <View style={styles.grid}>
                <View style={styles.row}>
                    <CalcButton label="AC" variant="action" onPress={handleAcPress} />
                    <CalcButton label="+/−" variant="action" onPress={pressSign} />
                    <CalcButton label="%" variant="action" onPress={handlePercentPress} />
                    <CalcButton
                        label="÷"
                        variant="operator"
                        onPress={() => handleOperatorPress('÷')}
                        active={activeOp === '÷'}
                    />
                </View>
                <View style={styles.row}>
                    <CalcButton label="7" variant="number" onPress={() => handleNumberPress('7')} />
                    <CalcButton label="8" variant="number" onPress={() => handleNumberPress('8')} />
                    <CalcButton label="9" variant="number" onPress={() => handleNumberPress('9')} />
                    <CalcButton
                        label="×"
                        variant="operator"
                        onPress={() => handleOperatorPress('×')}
                        active={activeOp === '×'}
                    />
                </View>
                <View style={styles.row}>
                    <CalcButton label="4" variant="number" onPress={() => handleNumberPress('4')} />
                    <CalcButton label="5" variant="number" onPress={() => handleNumberPress('5')} />
                    <CalcButton label="6" variant="number" onPress={() => handleNumberPress('6')} />
                    <CalcButton
                        label="−"
                        variant="operator"
                        onPress={() => handleOperatorPress('−')}
                        active={activeOp === '−'}
                    />
                </View>
                <View style={styles.row}>
                    <CalcButton label="1" variant="number" onPress={() => handleNumberPress('1')} />
                    <CalcButton label="2" variant="number" onPress={() => handleNumberPress('2')} />
                    <CalcButton label="3" variant="number" onPress={() => handleNumberPress('3')} />
                    <CalcButton
                        label="+"
                        variant="operator"
                        onPress={() => handleOperatorPress('+')}
                        active={activeOp === '+'}
                    />
                </View>
                <View style={styles.row}>
                    <CalcButton
                        label="0"
                        variant="number"
                        onPress={() => handleNumberPress('0')}
                        wide
                    />
                    <CalcButton label="." variant="number" onPress={() => handleNumberPress('.')} />
                    <CalcButton label="=" variant="equal" onPress={handleEqualPress} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#1c1c1e',
    },
    display: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingBottom: 12,
    },
    expression: {
        fontSize: 18,
        color: '#888',
        textAlign: 'right',
        marginBottom: 4,
    },
    current: {
        fontWeight: '200',
        color: '#ffffff',
        textAlign: 'right',
        letterSpacing: -2,
    },
    grid: {
        flexDirection: 'column',
        paddingHorizontal: 14,
        paddingBottom: 12,
        gap: 6,
    },
    row: {
        flexDirection: 'row',
        gap: 6,
    },
})
