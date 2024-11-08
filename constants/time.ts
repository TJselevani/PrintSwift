import { format, formatDistanceToNow, parseISO } from 'date-fns';


export const formatDateTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "EEEE, MMMM do, yyyy 'at' h:mm a");
};


export const formatTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

export const timeAgo = (dateString: string): string => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};
