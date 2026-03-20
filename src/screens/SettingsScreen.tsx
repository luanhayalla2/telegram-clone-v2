import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatSettings'>;

export default function SettingsScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme();
  const {
    enterToSend,
    setEnterToSend,
    fontSize,
    setFontSize,
    autoPlayGifs,
    setAutoPlayGifs,
    autoPlayVideos,
    setAutoPlayVideos,
    showNameAndPhoto,
    setShowNameAndPhoto,
    useShortNames,
    setUseShortNames,
    chatWallpaper,
    setChatWallpaper,
  } = useSettings();

  const [fontSizeModalVisible, setFontSizeModalVisible] = useState(false);
  const [wallpaperModalVisible, setWallpaperModalVisible] = useState(false);

  const fontOptions = [
    { label: 'Pequeno (14pt)', value: 14 },
    { label: 'Padrão (16pt)', value: 16 },
    { label: 'Grande (18pt)', value: 18 },
    { label: 'Extra Grande (20pt)', value: 20 },
  ];

  const wallpaperOptions = [
    { label: 'Padrão (Escuro)', value: '' },
    { label: 'Azul Celeste', value: '#0E1621' },
    { label: 'Verde Floresta', value: '#1E2C1E' },
    { label: 'Vinho', value: '#2C1E1E' },
    { label: 'Roxo Deep', value: '#1E1E2C' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>MENSAGENS</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="send" 
              iconBgColor="#007AFF" 
              label="Pressionar Enter para Enviar" 
              hasSwitch 
              switchValue={enterToSend} 
              onSwitchChange={setEnterToSend} 
              onPress={() => {}}
            />
            <SettingRow 
              iconName="brush" 
              iconBgColor="#F7931A" 
              label="Tamanho do Texto" 
              subtitle={`${fontSize}pt`} 
              onPress={() => setFontSizeModalVisible(true)} 
            />
            <SettingRow 
              iconName="image" 
              iconBgColor="#34C759" 
              label="Papel de Parede do Chat" 
              onPress={() => setWallpaperModalVisible(true)} 
              isLast 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>MIDIA</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="play-circle" 
              iconBgColor="#AF52DE" 
              label="Auto-reproduzir GIFs" 
              hasSwitch 
              switchValue={autoPlayGifs} 
              onSwitchChange={setAutoPlayGifs} 
              onPress={() => {}}
            />
            <SettingRow 
              iconName="videocam" 
              iconBgColor="#FF3B30" 
              label="Auto-reproduzir Vídeos" 
              hasSwitch 
              switchValue={autoPlayVideos} 
              onSwitchChange={setAutoPlayVideos} 
              onPress={() => {}} 
              isLast 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>OPÇÕES DE NOME</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <SettingRow 
              iconName="person-circle" 
              iconBgColor="#64D2FF" 
              label="Mostrar Nome e Foto" 
              hasSwitch 
              switchValue={showNameAndPhoto} 
              onSwitchChange={setShowNameAndPhoto} 
              onPress={() => {}} 
            />
            <SettingRow 
              iconName="text" 
              iconBgColor="#5856D6" 
              label="Usar Nomes Curtos" 
              hasSwitch 
              switchValue={useShortNames} 
              onSwitchChange={setUseShortNames} 
              onPress={() => {}} 
              isLast 
            />
          </View>
        </View>
      </ScrollView>

      {/* Font Size Modal */}
      <Modal visible={fontSizeModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Tamanho do Texto</Text>
            {fontOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.modalOption, fontSize === opt.value && { backgroundColor: colors.background }]}
                onPress={() => {
                  setFontSize(opt.value);
                  setFontSizeModalVisible(false);
                }}
              >
                <Text style={[styles.modalOptionText, { color: colors.textPrimary }]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setFontSizeModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Wallpaper Modal */}
      <Modal visible={wallpaperModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Papel de Parede do Chat</Text>
            {wallpaperOptions.map((opt) => (
              <TouchableOpacity
                key={opt.label}
                style={[styles.modalOption, chatWallpaper === opt.value && { backgroundColor: colors.background }]}
                onPress={() => {
                  setChatWallpaper(opt.value);
                  setWallpaperModalVisible(false);
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.colorPreview, { backgroundColor: opt.value || '#0a0b10', borderWidth: opt.value ? 0 : 1, borderColor: colors.separator }]} />
                  <Text style={[styles.modalOptionText, { color: colors.textPrimary }]}>{opt.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setWallpaperModalVisible(false)}
            >
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
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 14,
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#3A3B40',
  },
  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#3A3B40',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCancel: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
});
