import { LevelConfig } from '@/types'

export const levels: LevelConfig = {
  1: {
    name: "Foundation",
    description: "Work until 7pm daily + Basic workout (3 sets, 10 reps)",
    nonNegotiables: [
      "Work until 7:00 PM every day",
      "Complete basic workout: 3 sets of 10 reps",
      "No exceptions, no excuses"
    ]
  },
  2: {
    name: "Building",
    description: "Work until 9pm daily + Advanced workout + 1 hour prayer",
    nonNegotiables: [
      "Work until 9:00 PM every day",
      "Complete advanced workout: 4 sets of 15 reps",
      "Pray for 1 hour daily",
      "No exceptions, no excuses"
    ]
  },
  3: {
    name: "Advanced",
    description: "Work until 11pm daily + Intense workout + 2 hours prayer + Reading",
    nonNegotiables: [
      "Work until 11:00 PM every day",
      "Complete intense workout: 5 sets of 20 reps",
      "Pray for 2 hours daily",
      "Read for 1 hour daily",
      "No exceptions, no excuses"
    ]
  },
  4: {
    name: "Master",
    description: "Work until 1am daily + Elite workout + 3 hours prayer + Reading + Meditation",
    nonNegotiables: [
      "Work until 1:00 AM every day",
      "Complete elite workout: 6 sets of 25 reps",
      "Pray for 3 hours daily",
      "Read for 2 hours daily",
      "Meditate for 1 hour daily",
      "No exceptions, no excuses"
    ]
  }
}