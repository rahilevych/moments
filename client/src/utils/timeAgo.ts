export const timeAgo = (createdAt: string | Date) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} YEAR${interval === 1 ? '' : 'S'} AGO`;
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} MONTH${interval === 1 ? '' : 'S'} AGO`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} DAY${interval === 1 ? '' : 'S'} AGO`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} HOUR${interval === 1 ? '' : 'S'} AGO`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return `${interval} MINUTE${interval === 1 ? '' : 'S'} AGO`;
  return `${seconds} SECOND${seconds === 1 ? '' : 'S'} AGO`;
};
