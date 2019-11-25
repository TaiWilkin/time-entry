const passport = require('passport');
const Authentication = require('./controllers/authentication');
const Entries = require('./controllers/entries');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
module.exports = function(app) {
  app.get('/api/entries', requireAuth, Entries.getEntries);
  app.post('/api/entries',requireAuth, Entries.createEntry);
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.get('/api/signout', Authentication.signout);
  app.get('/api/currentuser', requireAuth, Authentication.getCurrentUser);
}
