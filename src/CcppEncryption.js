const fs = require('fs')
const forge = require('node-forge')

export const CcppEncryption = {
  encrypt (xmlString, publicKeyPath) {
    const publicKey = fs.readFileSync(publicKeyPath).toString()
    return this.encryptWithCert(xmlString, publicKey)
  },
  encryptWithCert (xmlString, publicKey) {
    const certFormPem = forge.pki.certificateFromPem(publicKey)

    let p7 = forge.pkcs7.createEnvelopedData()
    p7.addRecipient(certFormPem)
    p7.content = forge.util.createBuffer()
    p7.content.putString(xmlString)
    p7.encrypt()

    const pem = forge.pkcs7.messageToPem(p7)
    let returnPEM = pem.substring(23).trim()
    returnPEM = returnPEM.replace('-----END PKCS7-----', '')
    return returnPEM.replace(/\r?\n|\r/g, '')
  }
}
