export function makeFirstLetterUppercase(word: string): string | undefined {
  if (!word) {
    return undefined;
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}
