const fs = require('fs')
const forge = require('node-forge')

module.exports = {
  /**
   * @param {String} xmlString xml string that you want to encrypt.
   * @param {String} publicKeyPath path to your certificate file (this file you have to request from 2c2p)
   * @return {String} encrypted xml string
   */
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
  },
  /**
   * @param {String} encryptedXml encrypted reponse string from 2c2p payment action request.
   * @param {String} privateKeyPath path to your pem file (this file you have to request from 2c2p)
   * @return {String} string in xml
   */
  decrypt (encryptedXml, privateKeyPath) {
    const password = '2c2p'
    let privateKey = fs.readFileSync(privateKeyPath).toString()
    return this.decryptWithPem(encryptedXml, privateKey, password)
  },
  decryptWithPem (encryptedXml, privateKey, password) {
    let pem = '-----BEGIN PKCS7-----\n' + encryptedXml + '-----END PKCS7-----'
    let p7 = forge.pkcs7.messageFromPem(pem)
    let decryptRsaPrivateKey = forge.pki.decryptRsaPrivateKey(privateKey, password)
    p7.decrypt(p7.recipients[0], decryptRsaPrivateKey)
    return p7.content.toString('utf-8')
  }
}
