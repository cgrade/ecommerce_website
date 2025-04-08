/**
 * @param {number} price - The price to format.
 * @returns {string} The formatted price.
 * @description Formats a number as a Nigerian Naira (NGN) price string.
 */
export const formatPrice = (price: number): string => {
    return `₦${price.toFixed(2)}`;
  };