import { colors } from '@/constants/global';
import { fontFamily } from '@/dimensions/fontFamily';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type ProgressRingProps = {
  current_value: number;
  max_value: number;
  current_color: string;
};

export function ProgressRing({
  current_value,
  max_value,
  current_color,
}: ProgressRingProps) {
  const progressRatio = current_value / max_value;
  const radius = 135;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - Math.min(progressRatio, 1) * circumference;
  const strokeWidth = 21.5;

  const minutes = Math.floor(current_value / 1000 / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (Math.floor(current_value / 1000) % 60)
    .toString()
    .padStart(2, '0');

  return (
    <View style={styles.container}>
      <Svg width={300} height='100%' style={styles.svg}>
        <Circle
          cx='50%'
          cy='50%'
          r={radius}
          stroke={colors.surfaceDark}
          strokeWidth={strokeWidth}
          fill='transparent'
        />
        <Circle
          cx='50%'
          cy='50%'
          r={radius}
          stroke={current_color}
          strokeWidth={strokeWidth}
          fill='transparent'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
        />
      </Svg>
      <Text style={styles.text}>
        {minutes}:{seconds}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 310,
    alignItems: 'center',
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
  text: {
    position: 'absolute',
    top: '38%',
    fontFamily: fontFamily.regular,
    fontSize: 64,
    color: colors.primary,
    fontVariant: ['tabular-nums'],
    includeFontPadding: false,
    alignSelf: 'center',
  },
});
