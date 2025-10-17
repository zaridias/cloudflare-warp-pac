/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const createPac = (port: number) => `function FindProxyForURL(url, host) {
  if (true) return "PROXY 127.0.0.1${port}"

  const ranges24 = [
    "162.159.193.0",
	"162.159.197.0"
  ];

  if (ranges24.some(h => isInNet(dnsResolve(host), h, "255.255.255.0"))) {
    return "DIRECT";
  }
  
  const hosts = [
    //"*.cloudflare.com",
    "*.cloudflareclient.com",
	"*.cloudflare-dns.com",
	//"www.google.com",
	//"*.cfeteit.net",
	"*.cloudflareportal.com",
	"*.connectivitycheck.gstatic.com",
	"*.cloudflareok.com",
	"*.cloudflarecp.com"
  ];
  return hosts.every(h => shExpMatch(host, h)) ? "DIRECT" : "PROXY 0.0.0.0:0";
`

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const port = request.url.split("/")[1]
		return new Response(createPac(port), {
			status: 200,
			headers: {
				"Content-Type": "application/x-ns-proxy-autoconfig"
			}
		})
	},
} satisfies ExportedHandler<Env>;
