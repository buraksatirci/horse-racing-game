export function useFormatters() {

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = typeof timestamp === 'object' ? timestamp : new Date(timestamp);
    
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && 
                   date.getMonth() === now.getMonth() &&
                   date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatTime = (time) => {
    if (!time && time !== 0) return '';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return {
    formatTimestamp,
    formatTime
  };
} 