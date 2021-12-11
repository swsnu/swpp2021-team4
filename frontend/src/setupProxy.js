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
      target: 'http://ec2-3-38-182-212.ap-northeast-2.compute.amazonaws.com:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/place',
    createProxyMiddleware({
      target: 'http://ec2-3-38-182-212.ap-northeast-2.compute.amazonaws.com:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/post',
    createProxyMiddleware({
      target: 'http://ec2-3-38-182-212.ap-northeast-2.compute.amazonaws.com:8000',
      changeOrigin: true,
    })
  );
};
