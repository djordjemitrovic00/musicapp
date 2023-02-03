import { combineReducers } from 'redux';
import loginReducer from './login/loginReducer';
import loadingReducer from './loading/loadingReducer';
import userReducer from './user/userReducer';
import randomDataReducer from './randomData/randomDataReducer';
import registerReducer from './register/registerReducer'
import auhtProviderReducer from './authProvider/auhtProviderReducer';
import gameReducer from './game/gameReducer';


export default combineReducers({
  login: loginReducer,
  user: userReducer,
  loading:loadingReducer,
  randomData: randomDataReducer,
  register: registerReducer,
  authProvider: auhtProviderReducer,
  game: gameReducer,
});
