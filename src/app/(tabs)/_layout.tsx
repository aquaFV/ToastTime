import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwsome5 from '@expo/vector-icons/FontAwesome5';
import { colors } from '@/constants/global';
import { fontFamily } from '@/dimensions/fontFamily';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDarkSecondary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Timer',
          tabBarIcon: ({ color }) => (
            <Ionicons name='stopwatch-outline' color={color} size={40} />
          ),
        }}
      />
      <Tabs.Screen
        name='summary'
        options={{
          title: 'Summary',
          tabBarIcon: ({ color }) => (
            <FontAwsome5 name='clipboard-list' color={color} size={40} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 14,
    backgroundColor: colors.surfaceDark,
    height: 86,
    borderTopWidth: 2,
    borderTopColor: '#daddd8',
  },
  tabBarLabel: {
    marginTop: 4,
    fontFamily: fontFamily.regular,
    fontSize: 13,
  },
});
