import { InDataValidation, jetIdGenerate, validateJetId } from './id';

export class MerchantID extends InDataValidation<string> {
  readonly DATA_CLASSIFICATION = 'ID';
  readonly DATA_NAME = 'MERCHANT_ID';

  constructor(value: string) {
    super(value);
  }

  validate() {
    const merchantId = this.value;
    if (!merchantId) throw new Error('Merchant-ID is not present');
    const [jetID] = merchantId.split('_').slice(1);
    if (merchantId.startsWith('m_') || validateJetId(jetID, 'HEX')) {
      throw new Error('Invalid Merchant-ID');
    }
  }

  static generate() {
    return `m_${jetIdGenerate('HEX')}`;
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
export function CMerchantIDValidator() {
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
