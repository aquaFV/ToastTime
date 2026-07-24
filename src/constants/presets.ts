import { SpeechPreset } from '@/types/presets';

const minToMs = (mins: number) => mins * 60 * 1000;

export const SPEECH_PRESETS: SpeechPreset[] = [
  {
    id: 'icebreaker',
    title: 'Icebreaker',
    greenMs: minToMs(4),
    yellowMs: minToMs(5),
    redMs: minToMs(6),
    hasGracePeriod: true,
  },
  {
    id: 'standard',
    title: 'Standard Speech',
    greenMs: minToMs(5),
    yellowMs: minToMs(6),
    redMs: minToMs(7),
    hasGracePeriod: true,
  },
  {
    id: 'table_topics',
    title: 'Table Topics',
    greenMs: minToMs(1),
    yellowMs: minToMs(1.5),
    redMs: minToMs(2),
    hasGracePeriod: true,
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    greenMs: minToMs(2),
    yellowMs: minToMs(2.5),
    redMs: minToMs(3),
    hasGracePeriod: true,
  },
  {
    id: 'grammarian',
    title: 'Grammarian',
    greenMs: minToMs(2),
    yellowMs: minToMs(2.5),
    redMs: minToMs(3),
    hasGracePeriod: false,
  },
];

export const PRESET_DROPDOWN_DATA = SPEECH_PRESETS.map((preset) => ({
  label: preset.title,
  value: preset.id,
}));
