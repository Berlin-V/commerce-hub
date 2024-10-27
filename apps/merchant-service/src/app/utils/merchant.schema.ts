import { TDataValidator } from '@commerce-hub/type-utils';

export const merchantSchema = {
  firstName: ['mandatory', (v: string) => new Name(v)],
  middleName: ['optional', (v: string) => new Name(v)],
  lastName: ['mandatory', (v: string) => new Name(v)],
  phone: ['mandatory', (v: IPhoneNumber) => new PhoneNumber(v)],
  email: ['mandatory', (v: string) => new Email(v)],
  // address:
  currencies: ['optional', (v: ICurrencyTypes) => new Currency(v)],
  countryCode: ['optional', (v: ICountryCode) => new CountryCode(v)],
  language: ['optional', (v: ILanguage) => new Language(v)],
} as TDataValidator;

export const updateMerchantSchema = {
  id: ['mandatory', (v: string) => new Name(v)],
  ...merchantSchema,
};
