import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';

export default function ChatFoldersScreen() {
  const { colors } = useTheme();

  const handleCreateFolder = () => Alert.alert('Nova Pasta', 'Nesta tela você poderá definir regras para a nova pasta (ex: Apenas não lidos).');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="folder-open" size={120} color={colors.primary} style={styles.headerIcon} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>Pastas de Chat</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Crie pastas para diferentes grupos de chats e alterne rapidamente entre elas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>SUAS PASTAS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow iconName="list" iconBgColor="#007AFF" label="Todos os Chats" subtitle="Pasta padrão" onPress={() => Alert.alert('Todos os Chats', 'Esta é a pasta principal inamovível.')} />
            <SettingRow iconName="star" iconBgColor="#F7931A" label="Favoritos" subtitle="0 chats" onPress={() => Alert.alert('Favoritos', 'Sem chats favoritos no momento.')} isLast />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>RECOMENDADAS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow iconName="add-circle" iconBgColor="#34C759" label="Criar Nova Pasta" onPress={handleCreateFolder} isLast />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', padding: 32, textAlign: 'center' },
  headerIcon: { marginBottom: 16, opacity: 0.8 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, paddingHorizontal: 20 },
  section: { marginTop: 8 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', marginLeft: 16, marginBottom: 8, marginTop: 16 },
  card: { marginHorizontal: 16, borderRadius: 12, overflow: 'hidden' },
});
