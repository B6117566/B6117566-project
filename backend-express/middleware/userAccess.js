const userAccess = (req, res, next) => {
  if (!req.User_ID) {
    return res.status(403).json({
      sucessful: false,
      result: { messages: 'Forbidden' },
    });
  }

  const data = req.url.split('/');
  const dataLength = data.length;

  if (data[dataLength - 1] === req.User_ID) {
    next();
  } else {
    return res.status(403).json({
      sucessful: false,
      result: { messages: 'Forbidden' },
    });
  }
};

module.exports = userAccess;
