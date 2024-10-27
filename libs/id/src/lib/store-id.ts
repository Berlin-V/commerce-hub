import { InDataValidation, jetIdGenerate, validateJetId } from './id';

export class StoreID extends InDataValidation<string> {
  readonly DATA_CLASSIFICATION = 'ID';
  readonly DATA_NAME = 'MERCHANT_ID';

  constructor(value: string) {
    super(value);
  }

  validate() {
    const storeId = this.value;
    if (!storeId) throw new Error('Store-ID is not present');
    const [jetID] = storeId.split('_').slice(1);
    if (storeId.startsWith('s_') || validateJetId(jetID, 'HEX')) {
      throw new Error('Invalid Store-ID');
    }
  }

  static generate() {
    return `s_${jetIdGenerate('HEX')}`;
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
export function CStoreIDValidator() {
  return (control: {
    value: any;
  }): {
    [key: string]: string;
  } => {
    const value = control.value;
    try {
      new StoreID(value);
      return { status: 'SUCCESS' };
    } catch (e: any) {
      return {
        status: 'ERROR',
        merchant_ID: e.message,
      };
    }
  };
}
