/** Converts number into string with 'px' appended.
 * For example 123 becomes "123px"
 */
export function toPx(value: number): string {
  return value.toString() + 'px';
}
