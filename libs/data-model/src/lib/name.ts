import { InDataValidation } from '@commerce-hub/id';

export class Name extends InDataValidation<string> {
  override DATA_NAME: string | any;
  readonly DATA_CLASSIFICATION = 'TYPE';
  readonly CADM_NAME = 'NAME';

  constructor(value: string, variable: string = 'Name') {
    super(value, variable);
  }
  validate() {
    const NameRegex = new RegExp(
      /^[A-Z-a-z0-9\säöåÄÖÅ!@#$%^&*~?.,_:;()[\]|/`'"\\+=]*$/
    );
    const name = this._value;
    const variable = this._variable;
    if (!name?.trim()) {
      throw new Error(`${variable} is not valid`);
    }

    if (typeof name != 'string') {
      throw new Error(`Invalid ${variable} type. Expecting string.`);
    }

    if (name.length > 256) {
      throw new Error(
        'Length validation failed. Expecting string less than 256 characters.'
      );
    }
    if (!NameRegex.test(name)) throw new Error(`${name} is not valid`);

    return true;
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
