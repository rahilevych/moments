export const timeAgo = (
  createdAt: string | Date,
  options: { format?: 'long' | 'short' } = {}
) => {
  const { format = 'long' } = options;
  const createdDate = new Date(createdAt);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);
  let interval: number;

  if (seconds >= 31536000) {
    interval = Math.floor(seconds / 31536000);
    return format === 'short'
      ? `${interval}y`
      : `${interval} YEAR${interval === 1 ? '' : 'S'} AGO`;
  }
  if (seconds >= 2592000) {
    interval = Math.floor(seconds / 2592000);
    return format === 'short'
      ? `${interval}mo`
      : `${interval} MONTH${interval === 1 ? '' : 'S'} AGO`;
  }
  if (seconds >= 86400) {
    interval = Math.floor(seconds / 86400);
    return format === 'short'
      ? `${interval}d`
      : `${interval} DAY${interval === 1 ? '' : 'S'} AGO`;
  }
  if (seconds >= 3600) {
    interval = Math.floor(seconds / 3600);
    return format === 'short'
      ? `${interval}h`
      : `${interval} HOUR${interval === 1 ? '' : 'S'} AGO`;
  }
  if (seconds >= 60) {
    interval = Math.floor(seconds / 60);
    return format === 'short'
      ? `${interval}m`
      : `${interval} MINUTE${interval === 1 ? '' : 'S'} AGO`;
  }
  return format === 'short'
    ? `${seconds}s`
    : `${seconds} SECOND${seconds === 1 ? '' : 'S'} AGO`;
};
