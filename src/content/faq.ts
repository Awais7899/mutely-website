/**
 * Frequently asked questions, shared by the landing page and the Support page.
 * Answers describe the app as built (see StatusRoute/src and android/…/native).
 */
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    q: 'How does Mutely know when I arrive?',
    a: "Mutely uses Android's geofencing through Google Play services. You save a place with a radius, and your phone wakes Mutely when you enter or leave that circle. Mutely does not track your route in between.",
  },
  {
    q: 'Why does switching sometimes take a few minutes?',
    a: 'Android batches location checks to save battery, so arrivals and departures can be detected a few minutes late, especially with battery saver on. A larger radius (for example 250 m or more) makes detection more reliable.',
  },
  {
    q: 'What happens when I leave a place?',
    a: 'Mutely restores the ringer mode you had before you arrived. If you are inside two places at once, the one you entered most recently wins, and leaving it falls back to the other.',
  },
  {
    q: 'Why does Mutely need location "all the time"?',
    a: 'Switching has to work while the app is closed and your phone is in your pocket. Android only delivers geofence events to apps allowed to use location in the background. Your location is used for nothing else and never leaves your phone.',
  },
  {
    q: 'Why does Silent mode need "Do Not Disturb access"?',
    a: 'Android only lets apps switch the phone to fully silent with Do Not Disturb access. Vibrate and Loud work without it.',
  },
  {
    q: 'Is Mutely free? How many places can I add?',
    a: 'Mutely is currently free to download and use, with every feature included. You can add up to 100 places, which is the limit Android sets for each app.',
  },
  {
    q: 'Can I pause it without deleting my places?',
    a: 'Yes. Settings → Automation → Pause all places stops all switching and puts your ringer back the way it was. Turn it off to resume. You can also switch individual places on or off.',
  },
  {
    q: 'It never switches on my phone. What should I check?',
    a: 'Open Mutely → Settings. Make sure Location is "Allowed", Background location is "Allow all the time", device location is on, and (for Silent) Do Not Disturb access is allowed. Some phones (Samsung, Xiaomi, OnePlus, Huawei and others) also pause apps to save battery: set Mutely to "Unrestricted" under Battery optimization.',
  },
  {
    q: 'Does Mutely work on iPhone?',
    a: 'Not at the moment. Mutely is available for Android phones with Google Play services.',
  },
];
