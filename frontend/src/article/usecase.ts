export const parseImageMarkdown = (str: string): string | null =>
  str.match(/(?<alt>!\[[^\]]*\])\((?<filename>.*?)(?=\"|\))\)/)?.groups?.filename || null
