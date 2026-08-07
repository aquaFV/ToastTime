export type SpeechPreset = {
  id: string;
  title: string;
  greenMs: number;
  yellowMs: number;
  redMs: number;
  hasGracePeriod?: boolean;
};

export function custom_preset(data: Partial<SpeechPreset>): SpeechPreset {
  const deafaultPreset: SpeechPreset = {
    id: 'custom_speech',
    title: 'Custom Speech',
    greenMs: 240000,
    yellowMs: 300000,
    redMs: 360000,
    hasGracePeriod: true,
  };

  return {
    ...deafaultPreset,
    ...data,
  };
}
