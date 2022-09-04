import { parse as uuidParse, stringify as uuidStringify, v4 as uuidv4 } from 'uuid'

class UuidService {
  constructor() {}

  public generateUuid(): string {
    return uuidv4()
  }

  public parseBufferToString(uuid: Buffer): string {
    return uuidStringify(uuid)
  }

  public parseStringToBuffer(uuid: string): Buffer {
    return Buffer.from(Object.values(uuidParse(uuid)))
  }
}

export default UuidService
