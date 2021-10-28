//handle duplicates
const handleDuplicateKeyError = (err, reply) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `An with that ${field} already exists`;
  reply.code(code).send({
    sucessful: false,
    result: { messages: error, fields: field },
  });
};

//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, reply) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  const fields = Object.values(err.errors).map((el) => el.path);
  const code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join(' ');
    reply.code(code).send({
      sucessful: false,
      result: { messages: formattedErrors, fields: fields },
    });
  } else {
    reply.code(code).send({
      sucessful: false,
      result: { messages: errors, fields: fields },
    });
  }
};

module.exports = (err, req, reply) => {
  if (err.name === 'ValidationError')
    return (err = handleValidationError(err, reply));
  if (err.code && err.code == 11000)
    return (err = handleDuplicateKeyError(err, reply));
  return true;
};
