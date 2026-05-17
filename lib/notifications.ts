/**
 * Notification Service
 * Mocks the Microsoft Teams and Email integration (Bonus 5.2)
 */

interface NotificationPayload {
  recipientId: string;
  type: 'GOAL_SUBMITTED' | 'GOAL_APPROVED' | 'CHECK_IN_REMINDER' | 'ESCALATION';
  data: any;
}

export async function sendTeamsAdaptiveCard(payload: NotificationPayload) {
  console.log(`[TEAMS BOT] Sending Adaptive Card to ${payload.recipientId}`);
  console.log(`[TEAMS BOT] Content: `, payload.data);
  // Deep-link logic
  const deepLink = `https://goalsync-ai.company.com/approvals?empId=${payload.data.employeeId}`;
  console.log(`[TEAMS BOT] Deep-link attached: ${deepLink}`);
  return true;
}

export async function sendEmailNotification(payload: NotificationPayload) {
  console.log(`[EMAIL] Sending automated email for event: ${payload.type}`);
  return true;
}
