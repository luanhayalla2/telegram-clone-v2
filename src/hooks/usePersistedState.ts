import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook utilitário para criar um estado local que persiste automaticamente no AsyncStorage.
 */
export function usePersistedState<T>(key: string, defaultValue: T): [T, (val: T) => void, boolean] {
  const [state, setState] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key).then((storedValue) => {
      if (storedValue !== null) {
        try {
          setState(JSON.parse(storedValue));
        } catch (e) {
          // Fallback para caso seja uma string nua armazenada previamente
          setState(storedValue as unknown as T);
        }
      }
      setLoading(false);
    });
  }, [key]);

  const setPersistedState = async (value: T) => {
    setState(value);
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Erro ao salvar no AsyncStorage', e);
    }
  };

  return [state, setPersistedState, loading];
}
