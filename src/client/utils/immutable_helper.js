export const immutArray = (array = []) => {
  const copy = [...array];
  copy.updateAt = updateAt(array);
  copy.removeAt = removeAt(array);
  return copy;
};

export const immutObject = (o = {}) => {
  return {
    ...o,
    update: (prop, value) => {
      return immutObject({...o, [prop]: value});
    }
  };
};

const updateAt = (array) =>
  (index = 0) => ({
    // value: (value) => Object.assign([...array], {[index]: value}),
    value: (param) => {
      const foundObject = array[index];
      const result = typeof param === 'function' ? param(foundObject) : param;
      return immutArray(Object.assign([...array], {[index]: result}));
    }
  });

const removeAt = (array) => (index) => {
  const ret = [...array];
  ret.splice(index, 1);
  return ret;
};