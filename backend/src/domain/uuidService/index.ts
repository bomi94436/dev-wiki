import { PrimaryColumnOptions } from 'typeorm'
import { parse as uuidParse, stringify as uuidStringify, v4 as uuidv4 } from 'uuid'

class UuidService {
  constructor() {}

  public generateUuid(): string {
    return uuidv4()
  }

  public parseBufferToString(uuid: Buffer | string): string {
    if (!uuid) return uuid
    if (typeof uuid === 'string') return uuid
    else return uuidStringify(uuid)
  }

  public parseStringToBuffer(uuid: string): Buffer {
    return Buffer.from(Object.values(uuidParse(uuid)))
  }

  /**
   * @returns type, length, transformer가 정의된 typeorm column option
   */
  public uuidColumnOptions(option: PrimaryColumnOptions): PrimaryColumnOptions {
    const uuidSerivce = new UuidService()

    return {
      ...option,
      type: 'varbinary',
      length: 16,
      transformer: {
        from: uuidSerivce.parseBufferToString,
        to: uuidSerivce.parseStringToBuffer,
      },
    }
  }
}

export default UuidService
