export const getInitialCln = (
  defaultClass: string | undefined,
  scrollClass: string,
  search: boolean,
  scrolled: boolean
): string | undefined => {
  if (!defaultClass) {
    return search ? (scrolled ? scrollClass : undefined) : scrollClass;
  }

  return search ? (scrolled ? scrollClass : defaultClass) : scrollClass;
};
