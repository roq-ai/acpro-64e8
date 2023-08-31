import * as yup from 'yup';

export const financialRecordValidationSchema = yup.object().shape({
  transaction_date: yup.date().required(),
  amount: yup.number().integer().required(),
  transaction_type: yup.string().required(),
  account_type: yup.string().required(),
  description: yup.string().nullable(),
  organization_id: yup.string().nullable().required(),
});
