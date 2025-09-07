// Type definitions for the Good Citizen app

export interface Official {
  first_name: string;
  last_name: string;
  office: {
    title: string;
  };
  party: string;
  email_addresses?: string[];
  addresses?: Array<{
    phone_1?: string;
  }>;
  identifiers?: Array<{
    identifier_type: string;
    identifier_value: string;
  }>;
}

export interface RepInfoState {
  details: Official[] | null;
  error: string | null;
}

export interface Member {
  id: string;
  first_name: string;
  last_name: string;
}

export interface Vote {
  date: string;
  position: string;
  result: string;
  description: string;
  bill: {
    title?: string;
  };
}

export interface RecordState {
  details: Vote[] | null;
  error: string | null;
}

export interface RootState {
  repInfo: RepInfoState;
  members: Member[];
  record: RecordState;
}

export interface FormState {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}

// Redux action types
export interface SetRepInfoAction {
  type: 'SET_REP_INFO';
  repInfo: any;
}

export interface SetRepInfoErrAction {
  type: 'SET_REP_INFO_ERR';
  error: string;
}

export interface ClearRepInfoAction {
  type: 'CLEAR_REP_INFO';
}

export interface SetMembersAction {
  type: 'SET_MEMBERS';
  members: Member[];
}

export interface SetRecordAction {
  type: 'SET_RECORD';
  record: Vote[];
}

export interface SetRecordErrAction {
  type: 'SET_RECORD_ERR';
  error: string;
}

export interface ClearRecordAction {
  type: 'CLEAR_RECORD';
}

export type RepInfoActionTypes = SetRepInfoAction | SetRepInfoErrAction | ClearRepInfoAction;
export type MembersActionTypes = SetMembersAction;
export type RecordActionTypes = SetRecordAction | SetRecordErrAction | ClearRecordAction;