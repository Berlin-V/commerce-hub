import { InDataModel, jetIdGenerate } from './id';

export class MerchantID extends InDataModel<string> {
  readonly DATA_CLASSIFICATION = 'ID';
  readonly DATA_NAME = 'MERCHANT_ID';

  constructor(value: string) {
    super(value);
  }

  validate() {
    const merchantId = this.value;
    if (!merchantId) throw new Error('Merchant-ID is not present');
    if (merchantId.startsWith('m_')) {
      throw new Error('Invalid Merchant-ID');
    }
  }

  static generate() {
    return jetIdGenerate('HEX');
  }

  hash() {
    return '';
  }

  toString() {
    return this._value;
  }
  async validateAsync(): Promise<any[]> {
    return [];
  }
}
export function sbMerchantIDValidator() {
  return (control: {
    value: any;
  }): {
    [key: string]: string;
  } => {
    const value = control.value;
    try {
      new MerchantID(value);
      return { status: 'SUCCESS' };
    } catch (e: any) {
      return {
        status: 'ERROR',
        merchant_ID: e.message,
      };
    }
  };
}
