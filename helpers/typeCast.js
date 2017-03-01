const bitTypeCast = (field, next) => {
  if (field.type === 'BIT' && field.length === 1) {
    const value = field.string();
    return value === null ? null : !!value.charCodeAt(0); // 1 = true, 0 = false
  }
  return next();
};

module.exports = { bitTypeCast };