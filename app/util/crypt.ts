import { AES } from 'crypto-js'
import { generateKey } from './helper'

export const encrypt = (string: string): { encryptedString: string, key: string } => {
    const key = generateKey()
    return {
        key,
        encryptedString: AES.encrypt(string, key).toString()
    }
}

export const decrypt = (encryptedString: string, key: string): string => {
    return AES.decrypt(encryptedString, key).toString()
}