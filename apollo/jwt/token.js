
const jwt = require('jsonwebtoken');

let customTokenSecret = process.env.TOKEN_SECRET || 'xyz007abcnk7891';
let refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || '#$!xyz007abcnk7891%&*';

const Token = {
  getToken(authorizationHeader) {
    const token = authorizationHeader || false

    if (!token || token.split(' ')[0] !== 'Bearer')
      throw new Error('Invalid Authorization Header')

    return token.split(' ')[1]
  },
  verifyToken(token, refreshToken) {
    try {
      const user = jwt.verify(token, customTokenSecret);
      return user
    } catch (error) {
      // return Token.createTokens(payload, secret1, secret2)
        console.log('Error while verifying Token', token)
      return null
      // return Token.renewTokens(refreshToken, secret1, secret2)
    }
  },
  createTokens(payload, customDuration = '1d', refreshDuration = '7d') {
    const customToken = jwt.sign(payload, customTokenSecret, {expiresIn: customDuration})
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {expiresIn: refreshDuration})
    return [customToken, refreshToken]
  },
}

module.exports = Token
