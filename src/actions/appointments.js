import { API_ROOT } from './../constants/config';
import { getUserToken } from './../utils/storage';
import { Schemas } from './../utils/schema';
import { normalize } from 'normalizr';
import moment from 'moment';

import {
  APPOINTMENTS_REQUEST,
  APPOINTMENTS_SUCCESS,
  APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  INVALIDATE_APPOINTMENT,
  DELETE_APPOINTMENT
} from '../constants/ActionTypes';

function appointmentRequest() {
  return {
    type: APPOINTMENTS_REQUEST
  }
}

function appointmentSuccess(payload) {
  const normalized = normalize(payload.data,Schemas.APPOINTMENT_ARRAY);
  return {
    type: APPOINTMENTS_SUCCESS,
    entities: normalized.entities
  }
}

function appointmentFailure(error) {
  return {
    type: APPOINTMENTS_FAILURE,
    error: error
  }
}

function createAppointmentRequest() {
  return {
    type: CREATE_APPOINTMENT_REQUEST
  }
}

function createAppointmentSuccess() {
  return {
    type: CREATE_APPOINTMENT_SUCCESS
  }
}

function createAppointmentFailure(error) {
  return {
    type: CREATE_APPOINTMENT_FAILURE,
    error: error
  }
}


export function createAppointment(company,service,date,time,employee) {

  return (dispatch,state) => {

    dispatch(createAppointmentRequest());

    return getUserToken()
      .then((token) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        let params = {
          date:formattedDate,
          timing_id:time.id,
          employee_id:employee.id,
          company_id:company,
          service_id:service
        };
        let url = API_ROOT +`/appointments/make?api_token=${token}`;
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify(params)
        })
          .then(response =>  response.json())
          .then(json => {
            if (json.success) {
              dispatch(createAppointmentSuccess());
              dispatch(fetchAppointments());
            } else {
              dispatch(createAppointmentFailure(json.message))
            }
          })
      }).catch((err)=> dispatch(createAppointmentFailure(err)));
  }
}

export function fetchAppointments() {
  return (dispatch) => {
    dispatch(appointmentRequest());
    return  getUserToken().then((token) => {
      const url = API_ROOT + `/appointments/?api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json =>  { dispatch(appointmentSuccess(json)) })
    }).catch((err)=> { dispatch(appointmentFailure(err)) });
  }
}

function updateUserAppointments(appointments,appointmentID) {
  appointments = Object.keys(appointments).map((appointment) => {
    if(appointment == appointmentID) {
      return Object.assign({},appointments[appointment],{isDeleted:true});
    }
    return Object.assign({},appointments[appointment]);
  });
  const normalized = normalize(appointments,Schemas.APPOINTMENT_ARRAY);
  return {
    type: DELETE_APPOINTMENT,
    entities: normalized.entities
  }
}

export function cancelAppointment(appointmentID) {
  return (dispatch,state) => {

    const appointments = Object.assign({},state().entities.appointments);

    dispatch(updateUserAppointments(appointments,appointmentID));

    getUserToken().then((token) => {

      let params = {
        id:appointmentID
      };

      const url = API_ROOT + `/appointments/cancel?api_token=${token}`;
      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch((err)=>console.log(err))
    });
  }
}
export function invalidateCreatedAppointment() {
  return (dispatch) => {
    dispatch({type: INVALIDATE_APPOINTMENT});
  }
}