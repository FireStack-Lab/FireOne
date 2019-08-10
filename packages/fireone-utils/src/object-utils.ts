const replacer = (key: any, value: any) => {
  if (value.__proto__ === Map.prototype) {
    return {
      _type: 'map',
      map: Array.from(value),
    };
  } else {
    return value;
  }
};

const reviver = (key: any, value: any) => {
  if (value._type === 'map') {
    return new Map(value.map);
  } else {
    return value;
  }
};

export const serialize = (obj: object) => {
  return JSON.stringify(obj, replacer);
};

export const deserialize = (objStr: string) => {
  return JSON.parse(objStr, reviver);
};
