import axios from 'axios';
import queryString from 'query-string';
import { FinancialRecordInterface, FinancialRecordGetQueryInterface } from 'interfaces/financial-record';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFinancialRecords = async (
  query?: FinancialRecordGetQueryInterface,
): Promise<PaginatedInterface<FinancialRecordInterface>> => {
  const response = await axios.get('/api/financial-records', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFinancialRecord = async (financialRecord: FinancialRecordInterface) => {
  const response = await axios.post('/api/financial-records', financialRecord);
  return response.data;
};

export const updateFinancialRecordById = async (id: string, financialRecord: FinancialRecordInterface) => {
  const response = await axios.put(`/api/financial-records/${id}`, financialRecord);
  return response.data;
};

export const getFinancialRecordById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/financial-records/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinancialRecordById = async (id: string) => {
  const response = await axios.delete(`/api/financial-records/${id}`);
  return response.data;
};
