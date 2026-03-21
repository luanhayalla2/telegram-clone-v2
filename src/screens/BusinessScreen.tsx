import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';

export default function BusinessScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.header}>
          <MaterialCommunityIcons name="storefront" size={100} color="#FF3B30" style={styles.headerIcon} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>Telegram Business</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Transforme seu perfil em uma conta comercial com ferramentas avançadas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>FERRAMENTAS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow iconType="MaterialCommunityIcons" iconName="map-marker" iconBgColor="#5856D6" label="Localização" subtitle="Adicione seu endereço" onPress={() => Alert.alert('Localização', 'Abrirá o mapa para selecionar seu endereço oficial.')} />
            <SettingRow iconType="MaterialCommunityIcons" iconName="clock-outline" iconBgColor="#34C759" label="Horário de Funcionamento" subtitle="Defina seus horários" onPress={() => Alert.alert('Horários', 'Abriremos um gerenciador de horários em breve.')} />
            <SettingRow iconType="MaterialCommunityIcons" iconName="message-flash" iconBgColor="#007AFF" label="Respostas Rápidas" subtitle="Crie atalhos para mensagens" onPress={() => Alert.alert('Respostas Rápidas', 'Atalhos configurados salvam muito tempo de digitação.')} isLast />
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
});
