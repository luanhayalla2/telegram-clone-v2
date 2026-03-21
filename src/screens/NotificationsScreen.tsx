import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';
import { usePersistedState } from '../hooks/usePersistedState';

type OptionType = string;

export default function NotificationsScreen() {
  const { colors, isDark } = useTheme();

  // Estados de Notificações
  const [notifPrivate, setNotifPrivate] = usePersistedState<boolean>('notif_private', true);
  const [notifGroups, setNotifGroups] = usePersistedState<boolean>('notif_groups', true);
  const [notifChannels, setNotifChannels] = usePersistedState<boolean>('notif_channels', false);

  const [callVibration, setCallVibration] = usePersistedState<OptionType>('call_vibration', 'Padrão');
  const [callRingtone, setCallRingtone] = usePersistedState<OptionType>('call_ringtone', 'Padrão');

  const [syncContacts, setSyncContacts] = usePersistedState<boolean>('sync_contacts', true);
  const [notifPreview, setNotifPreview] = usePersistedState<boolean>('notif_preview', true);

  // Modal Control
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalOptions, setModalOptions] = useState<{label: string, value: string}[]>([]);
  const [currentValue, setCurrentValue] = useState<OptionType>('Padrão');
  const [onSelectOption, setOnSelectOption] = useState<(val: OptionType) => void>(() => () => {});

  const openSelector = (title: string, options: {label: string, value: string}[], value: OptionType, onSelect: (val: OptionType) => void) => {
    setModalTitle(title);
    setModalOptions(options);
    setCurrentValue(value);
    setOnSelectOption(() => onSelect);
    setModalVisible(true);
  };

  const handleSelect = (val: OptionType) => {
    onSelectOption(val);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>NOTIFICAÇÕES DE CHATS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="person" iconBgColor="#007AFF" label="Chats Privados" subtitle={notifPrivate ? 'Ativado' : 'Desativado'}
              hasSwitch switchValue={notifPrivate} onSwitchChange={setNotifPrivate} onPress={() => {}} 
            />
            <SettingRow 
              iconName="people" iconBgColor="#34C759" label="Grupos" subtitle={notifGroups ? 'Ativado' : 'Desativado'}
              hasSwitch switchValue={notifGroups} onSwitchChange={setNotifGroups} onPress={() => {}} 
            />
            <SettingRow 
              iconName="megaphone" iconBgColor="#AF52DE" label="Canais" subtitle={notifChannels ? 'Ativado' : 'Desativado'}
              hasSwitch switchValue={notifChannels} onSwitchChange={setNotifChannels} onPress={() => {}} 
              isLast 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>CHAMADAS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="call" iconBgColor="#34C759" label="Vibração" subtitle={callVibration} 
              onPress={() => openSelector('Vibração', [
                {label: 'Padrão', value: 'Padrão'}, {label: 'Curto', value: 'Curto'}, {label: 'Longo', value: 'Longo'}, {label: 'Desativado', value: 'Desativado'}
              ], callVibration, setCallVibration)} 
            />
            <SettingRow 
              iconName="musical-notes" iconBgColor="#F7931A" label="Toque" subtitle={callRingtone} 
              onPress={() => openSelector('Toque', [
                {label: 'Padrão', value: 'Padrão'}, {label: 'Silencioso', value: 'Silencioso'}
              ], callRingtone, setCallRingtone)} 
              isLast 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>OUTROS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="sync" iconBgColor="#64D2FF" label="Sincronizar Contatos" subtitle={syncContacts ? 'Ativado' : 'Desativado'}
              hasSwitch switchValue={syncContacts} onSwitchChange={setSyncContacts} onPress={() => {}} 
            />
            <SettingRow 
              iconName="eye" iconBgColor="#5856D6" label="Pré-visualização" subtitle={notifPreview ? 'Ativado' : 'Desativado'}
              hasSwitch switchValue={notifPreview} onSwitchChange={setNotifPreview} onPress={() => {}} 
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
            {modalOptions.map((opt) => (
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
    fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#3A3B40',
  },
  modalOption: {
    paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#3A3B40',
  },
  modalOptionText: { fontSize: 16 },
  modalCancel: { paddingVertical: 16, alignItems: 'center' },
  modalCancelText: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
});
