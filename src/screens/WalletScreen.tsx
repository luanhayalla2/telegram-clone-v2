import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';

export default function WalletScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="wallet-outline" size={100} color="#007AFF" style={styles.headerIcon} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>Carteira</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Envie e receba criptomoedas diretamente pelo chat do Telegram.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>SALDO ATUAL</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <View style={styles.balanceRow}>
              <Text style={[styles.balanceValue, { color: colors.textPrimary }]}>0.00 USD</Text>
              <TouchableOpacity 
                style={[styles.addFunds, { backgroundColor: colors.primary }]}
                onPress={() => Alert.alert('Adicionar Fundos', 'Integração de pagamento será adicionada em breve.')}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>CRYPTO</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow iconName="logo-bitcoin" iconBgColor="#F7931A" label="Bitcoin" subtitle="BTC • R$ 340.000" onPress={() => Alert.alert('Bitcoin', 'Compre, venda e negocie Bitcoin.')} />
            <SettingRow iconName="diamond" iconBgColor="#34C759" label="TON Space" subtitle="TON • R$ 35" onPress={() => Alert.alert('TON', 'Blockchain nativa do Telegram.')} isLast />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', padding: 32 },
  headerIcon: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  section: { marginTop: 8 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', marginLeft: 16, marginBottom: 8, marginTop: 16 },
  card: { marginHorizontal: 16, borderRadius: 12, overflow: 'hidden' },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  balanceValue: { fontSize: 24, fontWeight: 'bold' },
  addFunds: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
});
