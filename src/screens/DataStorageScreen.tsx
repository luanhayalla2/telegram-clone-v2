import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';
import { usePersistedState } from '../hooks/usePersistedState';

type DownloadOption = string;

export default function DataStorageScreen() {
  const { colors, isDark } = useTheme();

  const [autoDownloadMobile, setAutoDownloadMobile] = usePersistedState<DownloadOption>('auto_dl_mobile', 'Fotos');
  const [autoDownloadWifi, setAutoDownloadWifi] = usePersistedState<DownloadOption>('auto_dl_wifi', 'Todos arquivos');
  const [autoDownloadRoaming, setAutoDownloadRoaming] = usePersistedState<DownloadOption>('auto_dl_roaming', 'Desativado');

  const [saveToGallery, setSaveToGallery] = usePersistedState<boolean>('save_gallery', false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalOptions, setModalOptions] = useState<{label: string, value: string}[]>([]);
  const [currentValue, setCurrentValue] = useState<DownloadOption>('Desativado');
  const [onSelectOption, setOnSelectOption] = useState<(val: DownloadOption) => void>(() => () => {});

  const openSelector = (title: string, options: {label: string, value: string}[], value: DownloadOption, onSelect: (val: DownloadOption) => void) => {
    setModalTitle(title);
    setModalOptions(options);
    setCurrentValue(value);
    setOnSelectOption(() => onSelect);
    setModalVisible(true);
  };

  const showStorageInfo = () => Alert.alert('Uso do Armazenamento', 'Telegram está usando 1.2 GB do seu dispositivo para cache e mídias.');
  const showNetworkInfo = () => Alert.alert('Uso da Rede', 'Você consumiu 450 MB de dados móveis e 1.2 GB de Wi-Fi nos últimos 30 dias.');
  const clearCache = () => Alert.alert('Cache Limpo', 'O cache de mídia local foi apagado com sucesso.');

  const downloadChoices = [
    {label: 'Desativado', value: 'Desativado'},
    {label: 'Fotos', value: 'Fotos'},
    {label: 'Fotos e Vídeos', value: 'Fotos e Vídeos'},
    {label: 'Todos arquivos', value: 'Todos arquivos'}
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>USO DE DISCO E REDE</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow iconName="pie-chart" iconBgColor="#007AFF" label="Uso do Armazenamento" subtitle="1.2 GB" onPress={showStorageInfo} />
            <SettingRow iconName="stats-chart" iconBgColor="#34C759" label="Uso da Rede" subtitle="450 MB" onPress={showNetworkInfo} isLast />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>DOWNLOAD AUTOMÁTICO DE MÍDIA</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="cellular" iconBgColor="#34C759" label="Ao usar Dados Móveis" subtitle={autoDownloadMobile} 
              onPress={() => openSelector('Dados Móveis', downloadChoices, autoDownloadMobile, setAutoDownloadMobile)} 
            />
            <SettingRow 
              iconName="wifi" iconBgColor="#007AFF" label="Ao usar Wi-Fi" subtitle={autoDownloadWifi} 
              onPress={() => openSelector('Wi-Fi', downloadChoices, autoDownloadWifi, setAutoDownloadWifi)} 
            />
            <SettingRow 
              iconName="airplane" iconBgColor="#AF52DE" label="Em Roaming" subtitle={autoDownloadRoaming} 
              onPress={() => openSelector('Roaming', downloadChoices, autoDownloadRoaming, setAutoDownloadRoaming)} 
              isLast 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>OUTROS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="save" iconBgColor="#F7931A" label="Salvar na Galeria" subtitle={saveToGallery ? 'Ativado' : 'Desativado'}
              hasSwitch switchValue={saveToGallery} onSwitchChange={setSaveToGallery} onPress={() => {}} 
            />
            <SettingRow iconName="trash" iconBgColor="#FF3B30" label="Limpar Cache" onPress={clearCache} isLast />
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
                onPress={() => {
                  onSelectOption(opt.value);
                  setModalVisible(false);
                }}
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
