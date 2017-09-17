const passport = require('passport')
const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')

const requireAuth = passport.authenticate('jwt', { session: false }) // for authenticated routes

module.exports = function (app) {
  app.get('/', requireAuth, (req, res) => {
    res.send({ 'hi': 'authenticated' })
  })

  // requireSignin verifies email/pwd. Authentication.genUserTokenOnSignin creates a token
  // app.post('/signin', doSignin, Authentication.genUserTokenOnSignin)

  app.post('/signin',
    passport.authenticate('local', { session: false }), // session set to false cuz this is token based authentication
    Authentication.signin
  )

  // Authentication.signup creates a new user in DB
  app.post('/signup', Authentication.signup)
}
