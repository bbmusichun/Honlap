# VoiceStudio Web

Mobile-first PWA companion UI for a self-hosted VoiceStudio backend. It is designed for iPhone Safari and has no build step or external JavaScript dependencies.

## Important limitation

This is a browser frontend, not a port of the complete Electron/native application. It does not contain or run VoiceStudio AI models. It sends requests directly from the browser to a VoiceStudio backend you control. Backend APIs/models can differ by version; unsupported features are reported instead of faked.

Upstream: https://github.com/debpalash/VoiceStudio (AGPL-3.0). This is an independent community web companion, not an official release. The upstream project, model weights, voices and outputs may have separate licence terms.

## Deploy

### Netlify (recommended for a simple static host)

Import the `bbmusichun/Honlap` repository into Netlify. Keep the repository root as the base directory and leave the build command empty. The root `netlify.toml` sets the publish directory to `voicestudio-web`, so the app opens at the site's root URL. Do not upload the parent repository's files from an unrelated project.

### GitHub Pages

The workflow publishes this folder to `/Honlap/voicestudio-web/`. In repository Settings → Pages, choose **GitHub Actions** as the source once, then rerun the workflow in Actions. GitHub's workflow token cannot create/enable Pages for a repository when the required repository administration permission is unavailable.

## Connect

1. Start VoiceStudio on a computer or server.
2. Configure a reachable URL. Prefer HTTPS/Tailscale Serve or a secure reverse proxy for remote use.
3. Open the PWA in Safari, enter the backend URL, and enter the share PIN or API key only if needed.
4. Press **Kapcsolat tesztelése** and try Speak or Transcribe.

Browser access requires CORS to allow the PWA origin. A hosted HTTPS page may be blocked from calling a plain HTTP LAN address due to mixed-content protections. Use HTTPS/Tailscale and configure CORS if required. Never send API credentials over an untrusted plaintext connection.

## API routes

- `GET /.well-known/voicestudio-speech` (fallback `GET /health`) for connection checks.
- `POST /v1/audio/speech` with JSON `{ input, voice, response_format, speed }`.
- `POST /v1/audio/transcriptions` with JSON `{ audio: BASE64_WAV }`; the browser converts audio to mono PCM16 WAV at 16 kHz and limits each request to 30 seconds.
- `POST /v1/text/translations` with JSON `{ input, language }`.

## Privacy

- Only the backend URL is stored locally in browser preferences.
- PIN and API key remain in page memory and are cleared on disconnect/reload.
- Credentials are sent in request headers, never URL parameters.
- The service worker caches the app shell only, never audio, text or API requests.
- Do not expose VoiceStudio admin endpoints to the public internet.

## iPhone install

Open the HTTPS URL in Safari → Share → Add to Home Screen. Microphone capture requires HTTPS and explicit permission. If recording codecs are unavailable on a specific iOS version, use the file-selection option.
