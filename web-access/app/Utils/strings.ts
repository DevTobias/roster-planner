/**
 * If a is greater than b, return 1. If a is equal to b, return 0. Otherwise, return -1
 * @param a   The first string to compare.
 * @param b   The string to compare to.
 * @returns   The return value is a string that is either '1', '0', or '-1'.
 */
export const compareString = (a: string, b: string) => {
  // If a string is empty, push it to the back in sorting hierarchy
  if (a === '') return 1;
  if (b === '') return -1;

  return a > b ? '1' : a === b ? '0' : '-1';
};

/**
 * It converts the given string to lowercase and replaces all vowels with
 * corresponding letters.
 *
 * @param str The string to be prepared.
 * @returns   The prepared string.
 */
export const prepareString = (str: string) => {
  return str
    .toLowerCase()
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue');
};

/**
 * Given a first name and a last name, return a password that is the first name and last name
 * concatenated together.
 *
 * @param firstName   The first name of the user.
 * @param lastName    The last name of the user.
 * @returns The generated password.
 */
export const passwordFromName = (firstName: string, lastName: string) => {
  return `${prepareString(firstName)}.${prepareString(lastName)}`;
};

/**
 * Given a first name and a last name, return a email that is the first name and last name
 * concatenated together.
 *
 * @param firstName   The first name of the user.
 * @param lastName    The last name of the user.
 * @returns The generated email.
 */
export const emailFromName = (firstName: string, lastName: string) => {
  return `${prepareString(firstName)}.${prepareString(lastName)}@kita.de`;
};
