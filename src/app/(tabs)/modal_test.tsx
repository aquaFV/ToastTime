import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, globalStyles } from '@/constants/global';
import { useState, useRef } from 'react';

export default function ModalTest() {
  const [popupModal, setPopupModal] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [currentColor, setCurrentColor] = useState(colors.green);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const startPulseAnim = () => {
    setIsPulsing(true);
    fadeAnim.setValue(0);

    const signalPulse = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(signalPulse, { iterations: 4 }).start(({ finished }) => {
      if (finished) {
        setIsPulsing(false);
      }
    });
  };

  return (
    <View style={[globalStyles.container, { gap: 32 }]}>
      <Text style={{ color: 'white' }}>Modal Test</Text>

      <Modal
        visible={popupModal}
        backdropColor={'rgba(0,0,0,0.5)'}
        animationType='fade'
        onRequestClose={() => setPopupModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={{ color: '#000000' }}>This is a modal</Text>
            <TouchableOpacity
              onPress={() => setPopupModal(false)}
              style={styles.button}
            >
              <Text style={{ color: '#ffffff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setPopupModal(true)}
        style={styles.button}
      >
        <Text style={{ color: 'white' }}>Toggle Modal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          startPulseAnim();
        }}
        style={styles.button}
      >
        <Text style={{ color: 'white' }}>Toggle Pulse</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', padding: 12, gap: 12 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.green }]}
          onPress={() => setCurrentColor(colors.green)}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.yellow }]}
          onPress={() => setCurrentColor(colors.yellow)}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.red }]}
          onPress={() => setCurrentColor(colors.red)}
        />
      </View>

      <Animated.View
        pointerEvents='none'
        style={[
          styles.fadingView,
          { backgroundColor: currentColor, opacity: fadeAnim },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: colors.primary,
    width: '50%',
    height: 520,
    borderRadius: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#58b1e9',
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
  },
});
