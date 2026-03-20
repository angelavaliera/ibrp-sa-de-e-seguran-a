/**
 * Formats a phone string as (XX) XXXXX-XXXX or (XX) XXXX-XXXX
 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * Validates Brazilian phone: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
 */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

/**
 * Returns only digits from the phone string
 */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}
