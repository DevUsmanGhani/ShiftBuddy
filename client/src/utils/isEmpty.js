// Shows if item is empty

export default item => {
  return (item === undefined ||
  item === null ||
  (typeof item === 'object' && Object.keys(item).length === 0) ||
  (typeof item === 'string' && item.trim().length === 0))
};