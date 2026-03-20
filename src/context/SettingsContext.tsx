import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';
type Language = 'pt' | 'en';

interface SettingsContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  
  // Configurações de Chat
  enterToSend: boolean;
  setEnterToSend: (value: boolean) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  autoPlayGifs: boolean;
  setAutoPlayGifs: (value: boolean) => void;
  autoPlayVideos: boolean;
  setAutoPlayVideos: (value: boolean) => void;
  showNameAndPhoto: boolean;
  setShowNameAndPhoto: (value: boolean) => void;
  useShortNames: boolean;
  setUseShortNames: (value: boolean) => void;
  chatWallpaper: string;
  setChatWallpaper: (value: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguageState] = useState<Language>('pt');
  
  // States para Configurações de Chat
  const [enterToSend, setEnterToSendState] = useState(false);
  const [fontSize, setFontSizeState] = useState(16);
  const [chatWallpaper, setChatWallpaperState] = useState(''); // Empty means default theme color
  const [autoPlayGifs, setAutoPlayGifsState] = useState(true);
  const [autoPlayVideos, setAutoPlayVideosState] = useState(true);
  const [showNameAndPhoto, setShowNameAndPhotoState] = useState(true);
  const [useShortNames, setUseShortNamesState] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      const savedLang = await AsyncStorage.getItem('app_lang');
      const savedEnterToSend = await AsyncStorage.getItem('chat_enter_to_send');
      const savedFontSize = await AsyncStorage.getItem('chat_font_size');
      const savedAutoGifs = await AsyncStorage.getItem('chat_auto_gifs');
      const savedAutoVideos = await AsyncStorage.getItem('chat_auto_videos');
      const savedShowNamePhoto = await AsyncStorage.getItem('chat_show_name_photo');
      const savedShortNames = await AsyncStorage.getItem('chat_short_names');
      const savedWallpaper = await AsyncStorage.getItem('chat_wallpaper');

      if (savedTheme) setTheme(savedTheme as Theme);
      if (savedLang) setLanguageState(savedLang as Language);
      if (savedEnterToSend !== null) setEnterToSendState(savedEnterToSend === 'true');
      if (savedFontSize !== null) setFontSizeState(parseInt(savedFontSize));
      if (savedAutoGifs !== null) setAutoPlayGifsState(savedAutoGifs === 'true');
      if (savedAutoVideos !== null) setAutoPlayVideosState(savedAutoVideos === 'true');
      if (savedShowNamePhoto !== null) setShowNameAndPhotoState(savedShowNamePhoto === 'true');
      if (savedShortNames !== null) setUseShortNamesState(savedShortNames === 'true');
      if (savedWallpaper) setChatWallpaperState(savedWallpaper);
    } catch (e) {
      console.error('Erro ao carregar configurações:', e);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('app_theme', newTheme);
  };

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    await AsyncStorage.setItem('app_lang', lang);
  };

  // Funções de Update com Persistência
  const setEnterToSend = async (value: boolean) => {
    setEnterToSendState(value);
    await AsyncStorage.setItem('chat_enter_to_send', String(value));
  };

  const setFontSize = async (value: number) => {
    setFontSizeState(value);
    await AsyncStorage.setItem('chat_font_size', String(value));
  };

  const setAutoPlayGifs = async (value: boolean) => {
    setAutoPlayGifsState(value);
    await AsyncStorage.setItem('chat_auto_gifs', String(value));
  };

  const setAutoPlayVideos = async (value: boolean) => {
    setAutoPlayVideosState(value);
    await AsyncStorage.setItem('chat_auto_videos', String(value));
  };

  const setShowNameAndPhoto = async (value: boolean) => {
    setShowNameAndPhotoState(value);
    await AsyncStorage.setItem('chat_show_name_photo', String(value));
  };

  const setUseShortNames = async (value: boolean) => {
    setUseShortNamesState(value);
    await AsyncStorage.setItem('chat_short_names', String(value));
  };

  const setChatWallpaper = async (value: string) => {
    setChatWallpaperState(value);
    await AsyncStorage.setItem('chat_wallpaper', value);
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        theme, 
        language, 
        toggleTheme, 
        setLanguage,
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
        setChatWallpaper
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
  }
  return context;
}
