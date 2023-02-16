export const parseStringToInt = (str?: string | null) => {
  return str && !isNaN(parseInt(str)) ? parseInt(str) : null
}
