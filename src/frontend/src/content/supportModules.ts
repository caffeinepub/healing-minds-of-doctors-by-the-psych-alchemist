export interface SupportModule {
  id: string;
  title: string;
  duration: number; // in seconds
  audioPath: string;
}

export const supportModules: SupportModule[] = [
  {
    id: 'pre-round-anxiety',
    title: 'Pre-round anxiety',
    duration: 90,
    audioPath: '/assets/support-modules/pre-round-anxiety.mp3',
  },
  {
    id: 'post-round-exhaustion',
    title: 'Post-round exhaustion',
    duration: 120,
    audioPath: '/assets/support-modules/post-round-exhaustion.mp3',
  },
  {
    id: 'after-patient-loss',
    title: 'After patient loss',
    duration: 180,
    audioPath: '/assets/support-modules/after-patient-loss.mp3',
  },
  {
    id: 'after-medical-error',
    title: 'After medical error',
    duration: 150,
    audioPath: '/assets/support-modules/after-medical-error.mp3',
  },
  {
    id: 'night-duty-overwhelm',
    title: 'Night duty overwhelm',
    duration: 100,
    audioPath: '/assets/support-modules/night-duty-overwhelm.mp3',
  },
  {
    id: 'imposter-syndrome',
    title: 'Imposter syndrome',
    duration: 120,
    audioPath: '/assets/support-modules/imposter-syndrome.mp3',
  },
  {
    id: 'before-breaking-bad-news',
    title: 'Before breaking bad news',
    duration: 90,
    audioPath: '/assets/support-modules/before-breaking-bad-news.mp3',
  },
  {
    id: 'after-conflict',
    title: 'After conflict',
    duration: 110,
    audioPath: '/assets/support-modules/after-conflict.mp3',
  },
  {
    id: 'burnout-wave',
    title: 'Burnout wave',
    duration: 150,
    audioPath: '/assets/support-modules/burnout-wave.mp3',
  },
  {
    id: 'i-just-need-to-breathe',
    title: 'I just need to breathe',
    duration: 60,
    audioPath: '/assets/support-modules/i-just-need-to-breathe.mp3',
  },
];
