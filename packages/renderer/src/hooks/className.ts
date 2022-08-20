export const useClassName = (...classNames: (string | undefined | null)[]) => {
  return classNames
    .filter(className => className)
    .join(" ")
}
