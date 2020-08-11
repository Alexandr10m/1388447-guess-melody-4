const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const noop = () => {};

export {extend, noop};
