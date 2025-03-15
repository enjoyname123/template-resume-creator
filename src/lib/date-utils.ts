
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    // Handle YYYY-MM format (common for input[type="month"])
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
    }
    
    // Handle YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
    }
    
    // Handle other date formats or just return as is
    return dateString;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export function getCurrentMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export function formatMonthYearForInput(dateString: string): string {
  if (!dateString) return '';
  
  try {
    // If it's already in YYYY-MM format
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    // Attempt to parse the date
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    return `${year}-${month}`;
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
}
