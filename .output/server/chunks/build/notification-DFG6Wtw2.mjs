import { bc as NOTIFICATION_FILTER_TYPES } from './server.mjs';

function isNotificationFilter(obj) {
  return !!obj && NOTIFICATION_FILTER_TYPES.includes(obj);
}
function isNotification(obj) {
  return !!obj && ["mention", ...NOTIFICATION_FILTER_TYPES].includes(obj);
}

export { isNotification as a, isNotificationFilter as i };
