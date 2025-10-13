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

const createPac = () => `function FindProxyForURL(url, host) {
  const hosts = [
    "*.cloudflareclient.com"
	"*.cloudflare-dns.com
  ];
  return hosts.every(h => shExpMatch(host, h)) ? "DIRECT" : "PROXY 0.0.0.0:0";
`

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response(createPac(), {
			status: 200,
			headers: {
				"Content-Type": "application/x-ns-proxy-autoconfig"
			}
		})
	},
} satisfies ExportedHandler<Env>;
