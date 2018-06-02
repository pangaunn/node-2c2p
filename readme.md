## Node-2c2p

### Introduction
This is helper function for encryt and decrypt payment action for 2c2p

### Installation
```
npm install node-2c2p
```

### encrypt(xmlString, publicKeyPath)
```
/**
 * @param {String} xmlString xml string that you want to encrypt.
 * @param {String} publicKeyPath path to your certificate file (this file you have to request from 2c2p)
 * @return {String} encrypted xml string
 */
```

### decrypt(encryptedXml, privateKeyPath)
```
/**
 * @param {String} encryptedXml encrypted reponse string from 2c2p payment action request.
 * @param {String} privateKeyPath path to your pem file (this file you have to request from 2c2p)
 * @return {String} string in xml
 */
```
