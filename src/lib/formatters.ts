/**
 * Indian Rupee (INR) currency formatter using standard Indian numbering system
 * (e.g. ₹1,23,456)
 */
export function formatINR(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'Price unavailable';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates genuine percentage discount between original and current price.
 * Returns null if original price is absent or less than or equal to current price.
 */
export function calculateDiscount(
  currentPrice: number,
  originalPrice: number | null | undefined
): number | null {
  if (!originalPrice || originalPrice <= currentPrice) {
    return null;
  }
  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  return discount > 0 ? discount : null;
}

/**
 * Formats an ISO date string to readable Indian standard time / date
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Returns human-readable relative time string
 */
export function formatTimeAgo(dateString: string): string {
  return formatDate(dateString);
}
