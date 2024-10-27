import { generateID, validateId } from '@jetit/id';
import {
  DATA_CLASSIFICATION_TYPES,
  GENERATE_ID_TYPE,
} from '../utils/id.interface';

// function to generate ID using jetit
export function jetIdGenerate(type: GENERATE_ID_TYPE) {
  return generateID(type);
}

// function to validate ID using jetit
export function validateJetId(id: string, type: GENERATE_ID_TYPE) {
  return validateId(id, type);
}

export abstract class InDataValidation<T> {
  protected _value;
  protected _variable;
  abstract readonly DATA_CLASSIFICATION: DATA_CLASSIFICATION_TYPES;
  abstract readonly DATA_NAME: string;

  constructor(value: T, variable?: any) {
    this._value = value;
    if (variable) this._variable = variable;
    this.validate();
    this.validateAsync();
  }
  abstract validate(): any;
  abstract validateAsync(): Promise<any[]>;

  get value(): T {
    if (
      this._value ||
      (typeof this._value === 'number' && this._value === 0) ||
      typeof this._value === 'boolean'
    )
      return this._value;
    else throw new Error('Invalid Data Type');
  }

  equals<T>(value: T): boolean {
    return this._value === (value as unknown);
  }
  abstract toString(): string;
  abstract hash(): string;
}
