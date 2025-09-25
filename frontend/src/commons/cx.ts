//참조: https://dev.to/gugaguichard/replace-clsx-classnames-or-classcat-with-your-own-little-helper-3bf
export const cx = (...args: unknown[]) => {
  return args
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim();
};
