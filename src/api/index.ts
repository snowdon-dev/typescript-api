import express from 'express';
import bodyParser from 'body-parser';

import passport from 'passport';

import { app } from './register';
import { RegisterInput } from '../app/register/register.in';
import { RegisterPresenter, RegisterPresenterOutput } from './presenter/register/register.presenter';
import { RegisterInteractor } from '../app/register/register.interactor';

import { ensureLoggedIn } from 'connect-ensure-login';

import session from 'express-session';

import './config/passport';

const expressApp: express.Application = express();

expressApp.use(session({
  secret: 'dale',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}));


expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());

expressApp.use(passport.initialize());
expressApp.use(passport.session());

const register = async (input: RegisterInput): Promise<RegisterPresenterOutput> => {
  const presenter: RegisterPresenter = app.container.resolve<RegisterPresenter>('registerPresenter');
  const interator: RegisterInteractor = app.container.resolve<RegisterInteractor>('registerInteractor');
  const response = await interator.execute(input); // @todo don't rely on interator implementation
  const output = await presenter.present(response);
  return output;
};

expressApp.use((req: express.Request, res, next) => {
  console.log(req.method + ' : ' + req.originalUrl);
  next(null);
});

expressApp.get('/register', async (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(`
    <h1>Register</h1>
    <form action="/register" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Email:</label>
        <input type="email" name="email"/>
    </div>
    <div>
        <label>First Name:</label>
        <input type="text" name="firstname"/>
    </div>
    <div>
        <label>Last Name:</label>
        <input type="text" name="lastname"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Register"/>
    </div>
</form>
  `)
  res.end();
})

expressApp.post('/register', async (req, res) => {
  const input: RegisterInput = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const output: RegisterPresenterOutput = await register(input);
    res.json(output);
  } catch (e) {
    res.end(e.toString());
  }
});

expressApp.get('/', async (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(`
    <h1>Home</h1>
  `)
  res.end();
});

expressApp.get('/login', async (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="post">
    <div>
        <label>email:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>
  `)
  res.end();
})

expressApp.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  async (req, res) => {
    res.redirect('/');
});


expressApp.get('/authed',
  ensureLoggedIn(),
  async (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(`
      <h1>Authed route</h1>
    `);
  }
);

expressApp.listen(3000, () => {
  console.log('Express listening on 3000');
});
