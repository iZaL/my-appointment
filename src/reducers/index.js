import {combineReducers} from 'redux';

import entities from './entities';
import login from './Auth/login';
import register from './Auth/register';
import userReducer from './Auth/user';
import categoriesReducer from './Category/categories';
import categoryReducer from './Category/category';
import servicesReducer from './Service/services';
import serviceReducer from './Service/service';
import companyReducer from './Company/company';
import companiesReducer from './Company/companies';
import timingsReducer from './timings';

const rootReducer = combineReducers({
  entities,
  userReducer,
  login,
  register,
  categoriesReducer,
  categoryReducer,
  companyReducer,
  servicesReducer,
  serviceReducer,
  companiesReducer,
  timingsReducer
});

export default rootReducer;
