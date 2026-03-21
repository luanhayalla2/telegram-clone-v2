import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';

export default function PremiumScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="star" size={100} color="#AF52DE" style={styles.headerIcon} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>Telegram Premium</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Apoie o desenvolvimento do Telegram e ganhe recursos exclusivos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>RECURSOS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow iconName="infinite" iconBgColor="#FF9500" label="Limites Dobrados" subtitle="Até 1000 canais, 20 pastas" onPress={() => Alert.alert('Limites Dobrados', 'Você poderá participar de até 1000 canais.')} />
            <SettingRow iconName="cloud-upload" iconBgColor="#007AFF" label="Upload de 4 GB" subtitle="Tamanho máximo de arquivo" onPress={() => Alert.alert('Upload de 4GB', 'Envie vídeos e arquivos gigantescentes.')} />
            <SettingRow iconName="speedometer" iconBgColor="#34C759" label="Velocidades de Download" subtitle="Sem limites de velocidade" onPress={() => Alert.alert('Download Rápido', 'Acesse mídias sem estrangulamento de banda.')} isLast />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.subscribeButton, { backgroundColor: colors.primary }]}
          onPress={() => Alert.alert('Assinar Premium', 'Redirecionando para a loja de aplicativos...')}
        >
          <Text style={styles.subscribeText}>Assinar por R$ 19,90 / mês</Text>
        </TouchableOpacity>
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
  subscribeButton: { margin: 16, padding: 16, borderRadius: 12, alignItems: 'center' },
  subscribeText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
