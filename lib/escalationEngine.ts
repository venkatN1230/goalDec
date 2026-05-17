/**
 * Escalation Module (Rule-Based)
 * Bonus 5.3 - Configurable escalation rules triggered by defined conditions.
 */
import { sendTeamsAdaptiveCard, sendEmailNotification } from "./notifications";

interface Rule {
  conditionType: 'GOAL_NOT_SUBMITTED' | 'GOALS_NOT_APPROVED' | 'CHECK_IN_OVERDUE';
  daysOverdueThreshold: number;
  escalationLevel: 'EMPLOYEE' | 'MANAGER' | 'SKIP_LEVEL_HR';
}

const escalationConfig: Rule[] = [
  { conditionType: 'GOAL_NOT_SUBMITTED', daysOverdueThreshold: 3, escalationLevel: 'EMPLOYEE' },
  { conditionType: 'GOAL_NOT_SUBMITTED', daysOverdueThreshold: 7, escalationLevel: 'MANAGER' },
  { conditionType: 'GOAL_NOT_SUBMITTED', daysOverdueThreshold: 10, escalationLevel: 'SKIP_LEVEL_HR' },
];

export async function runEscalationCronJob() {
  // In a real implementation, this would query the DB for pending goals based on cycle dates.
  console.log("[ESCALATION ENGINE] Scanning for violations...");
  
  // Mock violation detection
  const violation = {
    employeeId: 'emp-2',
    managerId: 'mgr-1',
    daysOverdue: 8,
    condition: 'GOAL_NOT_SUBMITTED'
  };

  // Find triggered rule
  const triggeredRule = escalationConfig.find(r => r.conditionType === violation.condition && r.daysOverdueThreshold <= violation.daysOverdue);

  if (triggeredRule) {
    console.log(`[ESCALATION ENGINE] Triggered escalation at level: ${triggeredRule.escalationLevel}`);
    
    await sendEmailNotification({
      recipientId: triggeredRule.escalationLevel === 'MANAGER' ? violation.managerId : violation.employeeId,
      type: 'ESCALATION',
      data: { message: `URGENT: Goal submission is ${violation.daysOverdue} days overdue.` }
    });
    
    // Log to DB for Admin Audit Trail...
  }
}
