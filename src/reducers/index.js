import {combineReducers} from 'redux';

import entities from './entities';
import loginReducer from './login';
import registerReducer from './register';
import userReducer from './user';
import categoriesReducer from './categories';
import categoryReducer from './category';
import servicesReducer from './services';
import serviceReducer from './service';
import companyReducer from './company';
import companiesReducer from './companies';
import timingsReducer from './timings';

const rootReducer = combineReducers({
  entities,
  userReducer,
  loginReducer,
  registerReducer,
  categoriesReducer,
  categoryReducer,
  companyReducer,
  servicesReducer,
  serviceReducer,
  companiesReducer,
  timingsReducer
});

export default rootReducer;
