import { normalize, Schema, arrayOf,valuesOf,unionOf } from 'normalizr';

const categorySchema = new Schema('categories');
const companySchema = new Schema('companies');
const userSchema = new Schema('users');
const serviceSchema = new Schema('services');
const employeeSchema = new Schema('employees');
const timingSchema = new Schema('timings');
const appointmentSchema = new Schema('appointments');

categorySchema.define({
  companies: arrayOf(companySchema)
});

companySchema.define({
  favorites:arrayOf(userSchema),
  services:arrayOf(serviceSchema),
  employees:arrayOf(employeeSchema)
});

appointmentSchema.define({
  user:userSchema,
  company:companySchema,
  employee:employeeSchema,
  timing:timingSchema,
  service:serviceSchema
});

userSchema.define({
  favorites:arrayOf(companySchema)
});

serviceSchema.define({
  companies:arrayOf(companySchema)
});

export const Schemas = {
  CATEGORY:categorySchema,
  CATEGORY_ARRAY:arrayOf(categorySchema),
  COMPANY:companySchema,
  COMPANY_ARRAY:arrayOf(companySchema),
  SERVICE:serviceSchema,
  SERVICE_ARRAY:arrayOf(serviceSchema),
  USER:userSchema,
  USER_ARRAY:arrayOf(userSchema),
  APPOINTMENT:appointmentSchema,
  APPOINTMENT_ARRAY:arrayOf(appointmentSchema),
  TIMING:timingSchema,
  TIMING_ARRAY:arrayOf(timingSchema)
};
