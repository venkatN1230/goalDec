/**
 * Schedule Engine
 * Enforces quarterly windows for achievement capture and goal setting.
 */

export type CyclePhase = 'GOAL_SETTING' | 'Q1_CHECK_IN' | 'Q2_CHECK_IN' | 'Q3_CHECK_IN' | 'Q4_CHECK_IN' | 'CLOSED';

export interface CycleStatus {
  activePhase: CyclePhase;
  isOpen: boolean;
  message: string;
}

export function getCurrentCycle(mockDate?: Date): CycleStatus {
  const now = mockDate || new Date();
  const month = now.getMonth(); // 0-indexed: Jan = 0, Feb = 1...

  switch (month) {
    case 4: // May
      return { activePhase: 'GOAL_SETTING', isOpen: true, message: 'Goal Setting Window is Open. Submit your goals for approval.' };
    case 6: // July
      return { activePhase: 'Q1_CHECK_IN', isOpen: true, message: 'Q1 Check-in Window is Open. Please log your achievements.' };
    case 9: // October
      return { activePhase: 'Q2_CHECK_IN', isOpen: true, message: 'Q2 Check-in Window is Open. Please log your achievements.' };
    case 0: // January
      return { activePhase: 'Q3_CHECK_IN', isOpen: true, message: 'Q3 Check-in Window is Open. Please log your achievements.' };
    case 2: // March
    case 3: // April
      return { activePhase: 'Q4_CHECK_IN', isOpen: true, message: 'Q4 / Annual Review Window is Open. Final achievement capture.' };
    default:
      return { activePhase: 'CLOSED', isOpen: false, message: 'No active windows currently open. System is locked for updates.' };
  }
}

export function isGoalSettingOpen(mockDate?: Date): boolean {
  return getCurrentCycle(mockDate).activePhase === 'GOAL_SETTING';
}

export function isCheckInOpen(mockDate?: Date): boolean {
  const phase = getCurrentCycle(mockDate).activePhase;
  return phase === 'Q1_CHECK_IN' || phase === 'Q2_CHECK_IN' || phase === 'Q3_CHECK_IN' || phase === 'Q4_CHECK_IN';
}
