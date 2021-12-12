const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'https://apis-navi.kakaomobility.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'http://3.35.80.215/:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/place',
    createProxyMiddleware({
      target: 'http://3.35.80.215/:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/post',
    createProxyMiddleware({
      target: 'http://3.35.80.215/:8000',
      changeOrigin: true,
    })
  );
};
