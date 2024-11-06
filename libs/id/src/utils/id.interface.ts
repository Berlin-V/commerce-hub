export type DATA_CLASSIFICATION_TYPES = 'ID' | 'APPLICATION' | 'TYPE';

export type GENERATE_ID_TYPE =
  | 'BINARY'
  | 'DECIMAL'
  | 'HEX'
  | 'STRING'
  | 'URLSAFE';

export type FilterNever<T extends Record<string, unknown>> = Omit<
  T,
  { [P in keyof T]: T[P] extends Record<P, never> ? P : never }[keyof T]
>;
