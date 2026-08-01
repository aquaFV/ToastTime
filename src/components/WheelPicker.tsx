import { fontFamily } from '@/dimensions/fontFamily';
import { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';

type WheelPickerProps = {
  setSelectedMins: (mins: number) => void;
  setSelectedSecs: (secs: number) => void;
  color: string;
};

// ITEM_HEIGHT is used so that every item inside the scrollView has an equal height,
// and it enables the scrollView to snap to the nearest element using the ITEM_HEIGHT as an interval.
const ITEM_HEIGHT = 40;
// Creates a simple array holding the numbers 0-59
const NUMBERS = Array.from({ length: 60 }, (_, i) => i);
// Formats the numbers to text to be displayed (e.g., 1 -> 01)
const formatNumber = (num: number) => num.toString().padStart(2, '0');

export function WheelPicker({
  setSelectedMins,
  setSelectedSecs,
  color,
}: WheelPickerProps) {
  const handleScrollEnd = (
    unit: 'mins' | 'secs',
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    // Gets the scrollView's y offset to be used in calculating the currently selected item.
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, NUMBERS.length - 1));

    if (unit === 'mins') {
      setSelectedMins(clampedIndex);
    } else {
      setSelectedSecs(clampedIndex);
    }
  };

  return (
    <View style={styles.container}>
      {/* --- MINUTES WHEEL --- */}
      <View style={styles.wheelColumn}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate='fast'
          onScroll={(event) => handleScrollEnd('mins', event)}
          scrollEventThrottle={500}
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
          style={
            // Inject CSS styling since web apps can't handle React Native's built in snapping functionality.
            Platform.OS === 'web'
              ? ({ scrollSnapType: 'y mandatory' } as any)
              : undefined
          }
        >
          {NUMBERS.map((num) => (
            <View
              key={num}
              style={[
                styles.itemRow,
                // Same Idea as the last comment.
                Platform.OS === 'web'
                  ? ({ scrollSnapAlign: 'center' } as any)
                  : undefined,
              ]}
            >
              <Text style={[styles.itemText, { color }]}>
                {formatNumber(num)}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.labelOverlay} pointerEvents='none'>
          <Text style={[styles.unitText, { color: color }]}>mins</Text>
        </View>
      </View>

      {/* --- SECONDS WHEEL --- */}
      <View style={styles.wheelColumn}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate='fast'
          onMomentumScrollEnd={(event) => handleScrollEnd('mins', event)}
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
          style={
            Platform.OS === 'web'
              ? ({ scrollSnapType: 'y mandatory' } as any)
              : undefined
          }
        >
          {NUMBERS.map((num) => (
            <View
              key={num}
              style={[
                styles.itemRow,
                Platform.OS === 'web'
                  ? ({ scrollSnapAlign: 'center' } as any)
                  : undefined,
              ]}
            >
              <Text style={[styles.itemText, { color }]}>
                {formatNumber(num)}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.labelOverlay} pointerEvents='none'>
          <Text style={[styles.unitText, { color }]}>secs</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  wheelColumn: {
    height: ITEM_HEIGHT * 3,
    width: 100,
    position: 'relative',
  },
  itemRow: {
    height: ITEM_HEIGHT,
    alignItems: 'flex-start',
    paddingLeft: 16,
    justifyContent: 'center',
  },
  itemText: {
    fontFamily: fontFamily.medium,
    fontSize: 24,
    includeFontPadding: false,
  },
  labelOverlay: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    height: ITEM_HEIGHT,
    right: 5,
    justifyContent: 'center',
  },
  unitText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    includeFontPadding: false,
  },
});
