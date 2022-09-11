const requestIp = require('request-ip');

const getIP = (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  res.send({
    Object: clientIp
  });
}
module.exports = getIP;
