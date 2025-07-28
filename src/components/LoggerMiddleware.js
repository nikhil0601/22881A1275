export function logEvent(event, details) {
  console.log(`[${new Date().toISOString()}] ${event}:`, details);
}
