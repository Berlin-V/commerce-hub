/* eslint-disable no-prototype-builtins */
import {
  GetDataType,
  SimpleListValidatorResponse,
  TDataValidator,
  TValidatorResponse,
  TypeFromDataModel,
} from '@commerce-hub/type-utils';

export function zeroDepthValidator<V extends TDataValidator = TDataValidator>(
  data: any,
  schema: V
): TValidatorResponse<GetDataType<V>> {
  const mandatories = Object.keys(schema).filter(
    (t) => schema[t][0] === 'mandatory'
  );

  const returnObject: Record<string, unknown> = {};
  const errors: unknown[] = [];

  try {
    const missingMandatories = mandatories.filter(
      (x) => !Object.keys(data).includes(x)
    );
    if (missingMandatories.length > 0) {
      errors.push(
        `Mandatory Properties missing ${missingMandatories.join(', ')}`
      );
      return {
        status: 'ERROR',
        error: errors.join(', '),
      };
    }
    Object.keys(schema).forEach((k) => {
      const val = data[k];
      if (val || (typeof val === 'boolean' && val === false) || val === 0)
        returnObject[k] = schema[k][1](val);
      else
        mandatories.includes(k)
          ? errors.push(`Value of Object.${k} is invalid.`)
          : null;
    });

    if (errors.length > 0) {
      return {
        status: 'ERROR',
        error: errors.join(', '),
      };
    }
  } catch (e) {
    errors.push(e);
    return {
      status: 'ERROR',
      error: errors.join(', '),
    };
  }
  return {
    data: returnObject as GetDataType<V>,
    status: 'SUCCESS',
  };
}

export function simpleListValidator<V extends TDataValidator = TDataValidator>(
  data: Array<unknown>,
  schema: V
): SimpleListValidatorResponse<V> {
  const returnSet: Array<GetDataType<V>> = [];
  for (let i = 0; i < data.length; i++) {
    const validatedResponse = zeroDepthValidator<V>(data[i], schema);
    if (validatedResponse.status === 'ERROR') {
      return validatedResponse;
    }
    returnSet.push(validatedResponse.data);
  }
  return { status: 'SUCCESS', data: returnSet };
}

export function getJsonValue<V extends TDataValidator = TDataValidator>(
  data: GetDataType<V>
): TypeFromDataModel<GetDataType<V>> {
  return Object.keys(data).reduce<TypeFromDataModel<GetDataType<V>>>(
    (ret, cur) => {
      Array.isArray(data[cur])
        ? (ret[cur] = data[cur].map((v: typeof data) =>
            v['value'] || typeof v['value'] === 'boolean' || v['value'] === 0
              ? v['value']
              : getJsonValue(v)
          ))
        : data[cur].value ||
          typeof data[cur].value === 'boolean' ||
          data[cur].value === 0
        ? (ret[cur] = data[cur].value)
        : (ret[cur] = getJsonValue(data[cur]));
      return ret;
    },
    {} as TypeFromDataModel<GetDataType<V>>
  );
}
