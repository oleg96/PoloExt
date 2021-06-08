export function unionArrays(accumulator, currentValue) {

  return { ...accumulator, ...currentValue };
};
