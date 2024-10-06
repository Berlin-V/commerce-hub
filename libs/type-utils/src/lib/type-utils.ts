export type Validator<T> = (data: T) => ValidatorInternal;

export type Reverser<T extends Record<PropertyKey, PropertyKey>> = {
  [P in keyof T as T[P]]: P;
};

export type Split<S extends string> = string extends S
  ? string[]
  : S extends ''
  ? []
  : S extends `${infer T}${''}${infer U}`
  ? [T, ...Split<U>]
  : [S];

/**
 * Temporary Types for Computing types
 */
export type DTM = { value: unknown };

export type RemoveNever<T> = Omit<T, PickNeverKeys<T, keyof T>[number]>;

export type PickNeverKeys<T, K> = [
  K extends keyof T ? (T[K] extends never ? K : '') : K
];

type ValidatorInternal =
  | DTM
  | { [K: string]: ValidatorInternal }
  | Array<ValidatorInternal>;

type MandatoryPT<PT extends TDataValidator> = Writeable<
  {
    [K in keyof PT]: PT[K][0] extends 'mandatory'
      ? ReturnType<PT[K][1]>
      : never;
  },
  KeyOf<PT>
>;

type OptionalPT<PT extends TDataValidator> = Partial<
  Writeable<
    {
      [K in keyof PT]: PT[K][0] extends 'optional'
        ? ReturnType<PT[K][1]>
        : never;
    },
    KeyOf<PT>
  >
>;

export type KeyOf<T> = Extract<keyof T, string>;

export type Writeable<T extends { [x: string]: unknown }, K extends string> = {
  [P in K]: T[P];
};

export type TValidatorResponse<V> =
  | {
      status: 'ERROR';
      error: string;
    }
  | { status: 'SUCCESS'; data: V };

export type SimpleListValidatorResponse<V extends TDataValidator> =
  TValidatorResponse<Array<GetDataType<V>>>;

export type ValueOf<T> = T[keyof T];

export type KeysOfUnion<T> = T extends T ? keyof T : never;

export type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;

//data models
export type TDataValidator = Record<
  string,
  readonly ['mandatory' | 'optional', Validator<unknown>]
>;

export type GetDataType<T extends TDataValidator> = Prettify<
  RemoveNever<MandatoryPT<T>> & RemoveNever<OptionalPT<T>>
>;

export type TypeFromDataModel<T extends ValidatorInternal> = Prettify<{
  [P in keyof T]: T[P] extends DTM
    ? T[P]['value']
    : T[P] extends Array<DTM>
    ? Array<T[P][number]['value']>
    : T[P] extends
        | { [U: string]: ValidatorInternal }
        | Array<ValidatorInternal>
        | Array<{ [U: string]: ValidatorInternal }>
    ? TypeFromDataModel<T[P]>
    : never;
}>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
