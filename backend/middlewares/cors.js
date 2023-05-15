const allowedCors = [
  'http://api.alina-pr-mesto.nomoredomains.monster/',
  'https://api.alina-pr-mesto.nomoredomains.monster/',
  'http://alina-pr-mesto.nomoredomains.monster/',
  'https://alina-pr-mesto.nomoredomains.monster/',
  'http://51.250.106.186',
  'https://51.250.106.186',
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
