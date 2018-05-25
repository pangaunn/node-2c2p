const fs = require('fs')

export const CcppEncryption = {
  encrypt (xmlString, keyPath) {
    const cert = fs.readFileSync(certFile).toString()
    return this.encryptWithCert(xmlString, cert)
  },
  encryptWithCert (xmlString, cert) {

  }
}
