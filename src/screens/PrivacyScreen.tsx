import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';
import { usePersistedState } from '../hooks/usePersistedState';

type PrivacyOption = 'Todos' | 'Meus Contatos' | 'Ninguém';
const privacyChoices: { label: string; value: PrivacyOption }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Meus Contatos', value: 'Meus Contatos' },
  { label: 'Ninguém', value: 'Ninguém' },
];

export default function PrivacyScreen() {
  const { colors, isDark } = useTheme();

  // Estados de Privacidade
  const [phoneVisibility, setPhoneVisibility] = usePersistedState<PrivacyOption>('priv_phone', 'Meus Contatos');
  const [lastSeen, setLastSeen] = usePersistedState<PrivacyOption>('priv_last_seen', 'Todos');
  const [profilePhoto, setProfilePhoto] = usePersistedState<PrivacyOption>('priv_photo', 'Todos');
  const [forwarded, setForwarded] = usePersistedState<PrivacyOption>('priv_forwarded', 'Todos');
  const [groups, setGroups] = usePersistedState<PrivacyOption>('priv_groups', 'Todos');

  // Estados de Segurança
  const [passcode, setPasscode] = usePersistedState<boolean>('sec_passcode', false);
  const [twoStep, setTwoStep] = usePersistedState<boolean>('sec_twostep', false);

  // Controle do Modal Reutilizável
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentValue, setCurrentValue] = useState<PrivacyOption>('Todos');
  const [onSelectOption, setOnSelectOption] = useState<(val: PrivacyOption) => void>(() => () => {});

  const openSelector = (title: string, value: PrivacyOption, onSelect: (val: PrivacyOption) => void) => {
    setModalTitle(title);
    setCurrentValue(value);
    setOnSelectOption(() => onSelect);
    setModalVisible(true);
  };

  const handleSelect = (val: PrivacyOption) => {
    onSelectOption(val);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>PRIVACIDADE</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="person-remove" iconBgColor="#FF3B30" label="Usuários Bloqueados" subtitle="0" 
              onPress={() => Alert.alert('Bloqueados', 'Você não possui usuários bloqueados.')} 
            />
            <SettingRow 
              iconName="call" iconBgColor="#34C759" label="Número de Telefone" subtitle={phoneVisibility} 
              onPress={() => openSelector('Número de Telefone', phoneVisibility, setPhoneVisibility)} 
            />
            <SettingRow 
              iconName="time" iconBgColor="#007AFF" label="Visto por Último" subtitle={lastSeen} 
              onPress={() => openSelector('Visto por Último e Online', lastSeen, setLastSeen)} 
            />
            <SettingRow 
              iconName="camera" iconBgColor="#AF52DE" label="Foto de Perfil" subtitle={profilePhoto} 
              onPress={() => openSelector('Foto de Perfil', profilePhoto, setProfilePhoto)} 
            />
            <SettingRow 
              iconName="mail" iconBgColor="#F7931A" label="Mensagens Encaminhadas" subtitle={forwarded} 
              onPress={() => openSelector('Mensagens Encaminhadas', forwarded, setForwarded)} 
            />
            <SettingRow 
              iconName="people" iconBgColor="#5856D6" label="Grupos e Canais" subtitle={groups} 
              onPress={() => openSelector('Grupos e Canais', groups, setGroups)} 
              isLast 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>SEGURANÇA</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="keypad" iconBgColor="#64D2FF" label="Senha de Bloqueio" 
              subtitle={passcode ? 'Ativado' : 'Desativado'}
              hasSwitch switchValue={passcode} onSwitchChange={setPasscode} onPress={() => {}} 
            />
            <SettingRow 
              iconName="shield-checkmark" iconBgColor="#34C759" label="Verificação em Duas Etapas" 
              subtitle={twoStep ? 'Ativado' : 'Desativado'}
              hasSwitch switchValue={twoStep} onSwitchChange={setTwoStep} onPress={() => {}} 
              isLast 
            />
          </View>
        </View>
      </ScrollView>

      {/* Selector Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{modalTitle}</Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>Quem pode ver isso?</Text>
            
            {privacyChoices.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.modalOption, currentValue === opt.value && { backgroundColor: colors.background }]}
                onPress={() => handleSelect(opt.value)}
              >
                <Text style={[styles.modalOptionText, { color: colors.textPrimary }]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 },
  card: { marginHorizontal: 16, borderRadius: 12, overflow: 'hidden' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  modalContent: {
    width: '100%', maxWidth: 340, borderRadius: 14, overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingTop: 16,
  },
  modalSubtitle: {
    fontSize: 14, textAlign: 'center', paddingBottom: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#3A3B40',
  },
  modalOption: {
    paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#3A3B40',
  },
  modalOptionText: { fontSize: 16 },
  modalCancel: { paddingVertical: 16, alignItems: 'center' },
  modalCancelText: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
});
