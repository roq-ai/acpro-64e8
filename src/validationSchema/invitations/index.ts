import * as yup from 'yup';

export const invitationValidationSchema = yup.object().shape({
  status: yup.string().required(),
  sent_at: yup.date().required(),
  accepted_at: yup.date().nullable(),
  organization_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
