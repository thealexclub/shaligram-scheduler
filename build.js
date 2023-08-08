const esbuild = require('esbuild');
const http = require('http');

(async function main() {
  // Start esbuild's server on a random local port
  let ctx = await esbuild.context({
    outfile: './www/bundle.js',
    target: 'es2020',
    bundle: true,
    entryPoints: ['src/index.tsx'],
    sourcemap: true,
    plugins: [],
  })

  // The return value tells us where esbuild's local server is
  let { host, port } = await ctx.serve({ servedir: './www' })

  // Then start a proxy server on port 3000
  http.createServer((req, res) => {

    const forwardRequest = path => {
      const options = {
        hostname: host,
        port: port,
        path,
        method: req.method,
        headers: req.headers,
      }

      const proxyReq = http.request(options, proxyRes => {
        if (proxyRes.statusCode === 404) {
          // If esbuild 404s the request, assume it's a route needing to
          // be handled by the JS bundle, so forward a second attempt to `/`.
          return forwardRequest('/');
        }

        if (!proxyRes.statusCode) {
          return;
        }

        // Otherwise esbuild handled it like a champ, so proxy the response back.
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      req.pipe(proxyReq, { end: true });
    };

    // When we're called pass the request right through to esbuild.
    forwardRequest(req.url);
  }).listen(9000);

  console.log('Listeneing on port:', 9000);
})();