import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import useTheme from '../hooks/useTheme';
import SettingRow from '../components/SettingRow';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatSettings'>;

export default function SettingsScreen({ navigation }: Props) {
  const { colors } = useTheme();
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
  } = useSettings();

  const handleFontSizeChange = () => {
    Alert.alert(
      'Tamanho do Texto',
      'Escolha o tamanho das mensagens no chat:',
      [
        { text: 'Pequeno (14pt)', onPress: () => setFontSize(14) },
        { text: 'Padrão (16pt)', onPress: () => setFontSize(16) },
        { text: 'Grande (18pt)', onPress: () => setFontSize(18) },
        { text: 'Extra Grande (20pt)', onPress: () => setFontSize(20) },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

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
              onPress={handleFontSizeChange} 
            />
            <SettingRow 
              iconName="image" 
              iconBgColor="#34C759" 
              label="Papel de Parede do Chat" 
              onPress={() => Alert.alert('Papel de Parede', 'Esta funcionalidade será adicionada em breve.')} 
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 },
  card: { marginHorizontal: 16, borderRadius: 12, overflow: 'hidden' },
});
