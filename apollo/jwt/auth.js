
const { verifyToken } = require('./token');

module.exports = async (req, res, next) => {
  try {
    let [token, refreshToken] = verifyToken(auth.talash, SECRET1, auth.talashi, SECRET2)
    req.user = true
    if(refreshToken) {
      // send back to client to update in cookies
      console.log('token refreshed')
    }
  } catch (error) {
    console.log('verified error', error)
    req.user = false
    res.status(401).json({
      error,
      message: 'Invalid Token'
    });
  }
  next();
}
