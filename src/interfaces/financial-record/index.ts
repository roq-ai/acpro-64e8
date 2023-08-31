import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface FinancialRecordInterface {
  id?: string;
  transaction_date: any;
  amount: number;
  transaction_type: string;
  account_type: string;
  description?: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface FinancialRecordGetQueryInterface extends GetQueryInterface {
  id?: string;
  transaction_type?: string;
  account_type?: string;
  description?: string;
  organization_id?: string;
}
