import { FinancialRecordInterface } from 'interfaces/financial-record';
import { InvitationInterface } from 'interfaces/invitation';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  address?: string;
  phone?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  financial_record?: FinancialRecordInterface[];
  invitation?: InvitationInterface[];
  user?: UserInterface;
  _count?: {
    financial_record?: number;
    invitation?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  phone?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
