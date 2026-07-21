import { colors } from '@/constants/global';
import { StyleSheet } from 'react-native';
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
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (current_value / max_value) * circumference;
  const strokeWidth = 10;

  return (
    <Svg style={styles.svg}>
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
  );
}

const styles = StyleSheet.create({
  svg: {
    flex: 1,
    transform: [{ rotate: '-90deg' }],
  },
});
