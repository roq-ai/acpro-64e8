import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFinancialRecord } from 'apiSdk/financial-records';
import { financialRecordValidationSchema } from 'validationSchema/financial-records';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { FinancialRecordInterface } from 'interfaces/financial-record';

function FinancialRecordCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FinancialRecordInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFinancialRecord(values);
      resetForm();
      router.push('/financial-records');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FinancialRecordInterface>({
    initialValues: {
      transaction_date: new Date(new Date().toDateString()),
      amount: 0,
      transaction_type: '',
      account_type: '',
      description: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: financialRecordValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Financial Records',
              link: '/financial-records',
            },
            {
              label: 'Create Financial Record',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Financial Record
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="transaction_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Transaction Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.transaction_date ? new Date(formik.values?.transaction_date) : null}
              onChange={(value: Date) => formik.setFieldValue('transaction_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Amount"
            formControlProps={{
              id: 'amount',
              isInvalid: !!formik.errors?.amount,
            }}
            name="amount"
            error={formik.errors?.amount}
            value={formik.values?.amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.transaction_type}
            label={'Transaction Type'}
            props={{
              name: 'transaction_type',
              placeholder: 'Transaction Type',
              value: formik.values?.transaction_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.account_type}
            label={'Account Type'}
            props={{
              name: 'account_type',
              placeholder: 'Account Type',
              value: formik.values?.account_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/financial-records')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'financial_record',
    operation: AccessOperationEnum.CREATE,
  }),
)(FinancialRecordCreatePage);
