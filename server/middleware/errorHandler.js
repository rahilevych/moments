const errorHandler = (err, req, res, next) => {
  console.log('Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const field = err.field || null;
  res.status(status).json({ message, field });
};
export default errorHandler;
