import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';

export default function DevicesScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="laptop-outline" size={100} color={colors.primary} style={styles.headerIcon} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>Dispositivos</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Gerencie suas sessões ativas em outros dispositivos como Desktop ou Web.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>ESTE DISPOSITIVO</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow iconName="phone-portrait" iconBgColor="#34C759" label="iPhone 13 (Este)" subtitle="Online • Visto agora" onPress={() => {}} isLast />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>SESSÕES ATIVAS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow iconName="desktop" iconBgColor="#007AFF" label="Telegram Desktop" subtitle="São Paulo, Brasil • Ontem" onPress={() => {}} />
            <SettingRow iconName="globe" iconBgColor="#64D2FF" label="Telegram Web" subtitle="Rio de Janeiro, Brasil • 2 dias atrás" onPress={() => {}} isLast />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutAll}>
            <Text style={{ color: '#FF3B30', fontSize: 16, fontWeight: '600' }}>Encerrar Todas as Outras Sessões</Text>
          </TouchableOpacity>
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
  logoutAll: { alignItems: 'center', justifyContent: 'center', padding: 20 },
});
