export const parseImageMarkdown = (str: string): string | undefined =>
  str.match(/(?<alt>!\[[^\]]*\])\((?<filename>.*?)(?=\"|\))\)/)?.groups?.filename || undefined
