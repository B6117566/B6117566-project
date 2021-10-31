module.exports = function (req, reply, next) {
  if (!req.User_ID) {
    return reply.code(403).send({
      sucessful: false,
      result: { messages: 'Forbidden' },
    });
  }

  const data = req.url.split('/');
  const dataLength = data.length;

  if (data[dataLength - 1] === req.User_ID) {
    next();
  } else {
    return reply.code(403).send({
      sucessful: false,
      result: { messages: 'Forbidden' },
    });
  }
};
