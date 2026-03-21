import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';
import { usePersistedState } from '../hooks/usePersistedState';

export default function PowerSavingScreen() {
  const { colors } = useTheme();

  const [powerAuto, setPowerAuto] = usePersistedState<boolean>('power_auto', false);
  const [animations, setAnimations] = usePersistedState<boolean>('power_anim', true);
  const [syncBg, setSyncBg] = usePersistedState<boolean>('power_sync', true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="battery-dead" size={100} color="#34C759" style={styles.headerIcon} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>Economia de Energia</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Reduza o consumo de bateria desativando animações e processos em segundo plano.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>OPÇÕES</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="flash" iconBgColor="#FF9500" label="Modo Econômico Auto" subtitle="Ativar abaixo de 20%" 
              hasSwitch switchValue={powerAuto} onSwitchChange={setPowerAuto} onPress={() => {}}
            />
            <SettingRow 
              iconName="film" iconBgColor="#AF52DE" label="Desativar Animações" subtitle={animations ? 'Animações ativadas' : 'Animações desativadas'}
              hasSwitch switchValue={animations} onSwitchChange={setAnimations} onPress={() => {}}
            />
            <SettingRow 
              iconName="sync" iconBgColor="#007AFF" label="Sincronização em Segundo Plano" subtitle={syncBg ? 'Permitida' : 'Limitada'}
              hasSwitch switchValue={syncBg} onSwitchChange={setSyncBg} onPress={() => {}} 
              isLast 
            />
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
