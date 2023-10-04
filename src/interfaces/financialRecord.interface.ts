export interface IFinancialRecord {
  id?: string;
  title: string;
  type: string;
  amount: number;
  transactionDate: Date;
  category: string;
  medium: string;
  trxId?: string;
}

export interface ISalaryRecordDto {
  id: string;
  title: string;
  amount: number;
  transactionDate: Date;
  medium: string;
  trxId?: string;
}
