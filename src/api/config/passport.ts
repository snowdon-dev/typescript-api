import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { app } from '../register';
import { FindUserInteractor } from '../../app/find-user/find-user.interactor';
import { FindUserOutput } from '../../app/find-user/find-user.out';
import { FindUserInput } from '../../app/find-user/find-user.in';

passport.serializeUser(function(user: any, done: (arg0: any, arg1: any) => void) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj: any, done: (arg0: any, arg1: any) => void) {
    done(null, obj);
  });
  passport.use(new LocalStrategy(async (username, password, done) => {
    
    const findUser: FindUserInteractor = app.container.resolve<FindUserInteractor>('findUserInteractor');
    const input: FindUserInput = {
      email: username,
    };
    const response: FindUserOutput = await findUser.execute(input);
    console.log(response);
    if (!response) {
      return done('Incorrect username');
    }
    if (response.user.password === password) {
      console.log('login success: ' + password);
      return done(null, {
        firstname: response.user.firstname,
        lastname: response.user.lastname,
        email: response.user.email,
        username: response.user.username,
        id: response.user.id,
      });
    }
    return done(null, false, { message: 'Incorrect password.' })
  }));
  