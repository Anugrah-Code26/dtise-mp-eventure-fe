export type Voucher = {
  voucherId: number;
  code: string;
  name: string;
  amount: number;
  description: string;
  totalCapacity: number;
  totalAvailable: number;
  validityPeriod: string;
  eventId: number;
  eventName: string;
  voucherTypeId: number;
  voucherTypeName: string;
};

export type VoucherResponse = {
  statusCode: number;
  message: string;
  success: boolean;
  data: Voucher[];
};
