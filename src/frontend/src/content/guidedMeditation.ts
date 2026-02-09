export interface AmbientSound {
  id: string;
  label: string;
  path: string;
}

export const ambientSounds: AmbientSound[] = [
  {
    id: 'rain',
    label: 'Rain',
    path: '/assets/guided-meditation/rain.mp3',
  },
  {
    id: 'wind',
    label: 'Wind',
    path: '/assets/guided-meditation/wind.mp3',
  },
  {
    id: 'birds',
    label: 'Birds',
    path: '/assets/guided-meditation/birds.mp3',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    path: '/assets/guided-meditation/ocean.mp3',
  },
  {
    id: 'instrumental',
    label: 'Instrumental',
    path: '/assets/guided-meditation/instrumental.mp3',
  },
  {
    id: 'calm-ambient',
    label: 'Calm Ambient (Online)',
    path: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d1718ab41b.mp3',
  },
];

export const meditationScript = `Welcome to this 3-minute reset for doctors.

Find a comfortable position. You can sit or stand.

Take a deep breath in through your nose... and slowly release through your mouth.

Notice where you are right now. You've stepped away from the demands of your work.

This moment is yours.

Breathe naturally. There's nothing you need to fix or change.

With each inhale, imagine drawing in calm and clarity.

With each exhale, release the weight you've been carrying.

Your breath is always with you. A constant anchor.

If thoughts arise about patients, tasks, or responsibilities, acknowledge them gently.

Then return to your breath.

You are more than your role. You are more than your last decision.

You are here. You are breathing. You are enough.

Continue breathing at your own pace.

Let your shoulders drop. Soften your jaw.

You are safe in this moment.

When you're ready, take one more deep breath in... and let it go.

Slowly return your awareness to the room.

Thank you for taking this time for yourself.`;
