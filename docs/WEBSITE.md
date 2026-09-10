# GoldWorks website — maintenance notes

## Site and deployment

- Next.js static export on GitHub Pages, with `goldworks.net` preserved in `public/CNAME`.
- Production is published at https://goldworks.net. Deployments and their exact source commits are recorded in the repository's GitHub Actions history.
- `npm ci` installs locked dependencies. `npm run dev` starts local development. `npm run build:pages` checks the motion timeline, creates the `out` export and validates public pages, local assets and metadata. `npm run check:motion` runs the timeline regression checks separately; `npm run typecheck` runs TypeScript.
- The workflow builds pushes and pull requests. Only the repository default branch can deploy. Concurrency is separated by ref; pull-request builds cannot cancel a production deployment. Production runs finish rather than being interrupted by a newer run.
- Generated `out` files are no longer source-controlled. GitHub Actions builds and uploads them. Source files, assets and the lockfile are the delivery inputs.
- The repository-path fallback is supported by `PAGES_BASE_PATH`; the existing CNAME takes precedence and publishes from `/`. `NEXT_PUBLIC_BASE_PATH` is derived from the same value for images and metadata.
- Build errors are no longer ignored. Next.js was updated to 16.3.4 and vulnerable transitive packages were updated within their supported versions; npm audit reported zero vulnerabilities after installation.
- After local verification, push the reviewed source to the default branch, wait for the GitHub Pages workflow to succeed, then verify the live homepage and legal routes. The local preview is http://127.0.0.1:3000/ while the development server runs.

## Homepage direction

GoldWorks is an independent game studio. The homepage contains a compact Tiny Fishing Club Steam link, without a game showcase, release information, official game artwork, unannounced apps, or former project names.

The homepage is entirely in English, including accessible labels, navigation, legal links and search/sharing metadata. Its central promise is “Crafting play. Making it matter.” The legal documents remain in Korean, with their own content language declared. The export check rejects Korean homepage text or metadata.

The homepage expresses the meaning of Gold: refining a spark of imagination into play that people value and return to. A single full-bleed, native-scroll scene places a wide Syne wordmark behind a real-time gold sculpture. A continuous ribbon unfolds across the viewport, passes through two camera orbits, reforms beside the studio statement, and opens around the final words. Two fine light trails follow the same geometry. The atmosphere, fragments, particles, typography and camera belong to one composition. There are no fish or water motifs. The contact section returns to normal document flow; scrolling is never intercepted.

The sculpture uses 18 adjoining ribbon strips with shader-driven shape changes. Shared geometry and instanced rendering handle fragments (10 fragments / 1,800 particles on initial mobile load; 18 / 3,600 on desktop). Pointer movement changes the viewpoint and bends nearby material. A tap briefly separates the strips with a smooth pulse; touch scrolling does not trigger the pulse. Ambient motion runs continuously while visible, with drawing targeted at 30 fps; direct interaction uses display frames. Pixel ratio is capped at 1.5. Rendering stops offscreen and in hidden tabs. Resources are disposed when navigating away.

`StudioExperience` owns a single animation clock. A frame-rate-independent, critically damped timeline in `lib/experience-motion.ts` publishes typography and calls the 3D renderer in the same frame. Scroll input changes a target; neither the text nor the camera jumps directly to it. The renderer has no competing animation loop, no three-pose quantization, and no arbitrary idle timer. The regression checks cover 30/60/120 Hz, reverse scrolling, anchor jumps, continuous paths and readable chapter destinations.

Syne at weight 800 supplies the distinctive wide display lettering; Noto Sans KR supplies body text and Korean legal text. JetBrains Mono is reserved for small scene labels. All three are self-hosted through Next.js font optimization, with no visitor requests to Google Fonts.

The gold revision was checked in desktop and mobile browser layouts, including the narrow 320 px viewport. The click-driven separation, scroll-driven formation/opening, contact navigation and policy route were checked in the browser. Static export and TypeScript checks passed for both `/` and `/goldworks-official-landing`; normal motion was tested temporarily and the operating-system preference restored before the final export.

There is no Motion On/Off control. Reduced motion disables autonomous movement and pointer parallax, and sharply attenuates camera travel. Direct scroll and tap input still produces continuous material changes. This removes the visible hard cuts that previously occurred at 25% and 75% progress in the owner's browser. The static background, server-rendered text, Steam link, contact and policy navigation remain usable when WebGL is unavailable. Without JavaScript, chapter content stays in normal document flow. Legal pages do not load the 3D scene.

Reference analysis used the two local video files supplied by the owner (18.09 seconds and 14.37 seconds). The first shows cinematic scene-to-scene camera transitions; the second shows typography, translucent objects and particles within a shared spatial composition. The implementation borrows those presentation principles; it does not copy the videos or embed their footage.

### Original environment asset

`public/images/gold-atmosphere.webp` is an original generated environment plate (1672 × 941, about 17 KB after WebP encoding), created for this site. It contains a near-black void, gold haze at the right edge and a soft cool light at the far left, without water, a horizon or objects. The sculpture, reflective materials and particles are rendered in real time. No third-party game artwork is used on the homepage.

### Development issue diagnosis

A reported hydration warning came from a random browser-added `data-*` attribute on `<html>`. The root element alone tolerates that external attribute mismatch; hydration checks remain active inside the application. The old PMREM lighting path also emitted driver-specific shader precision warnings. It was removed with the old scene; the new scene uses explicit shaders without that environment conversion. The development badge is disabled, while Next.js continues to surface real compilation and runtime failures.

The animation coordinator uses Next.js's file-scoped `@refresh reset` directive. Editing its shared state contract remounts it during development instead of retaining stale animation callbacks through Fast Refresh. This has no production behavior or effect on ordinary page interactions.

## Privacy pages

- `/privacy/`: shared GoldWorks policy for services that link to it.
- `/privacy/byeolmong/`: service-specific disclosure required to describe the app's real processing. This legal appendix is separate from the homepage and is not a marketing feature.
- `/account-deletion/`: general email-based deletion request instructions, also identifying the app for Google Play. This is a request path, not an automated deletion service.
- Policy contact and account-retention principle were confirmed by the owner: GoldWorks, support@goldworks.net, retain account data while the account is maintained.

### App release follow-through

The separate app project was inspected read-only. Its authentication service writes the primary birth profile to Firestore; the engine runs on device; additional profiles and chosen photos are local; place search and map tiles call OpenStreetMap. A Firebase package alone was not treated as evidence that analytics or App Check is running.

Before submitting the app, connect the privacy and deletion URLs visibly within the app, and make Play Console's Data safety answers match the release binary. The inspected code included legal consent text but no linked policy or in-app account deletion entry. Google permits an in-app link to a deletion request web resource; it does not require this website to implement account deletion by itself. The operator must actually process requests, including Authentication and related Firestore data.

Verify the production Firestore location and all overseas-processing disclosures against deployed settings. Local backend documentation recommends Seoul but does not prove the deployed database location. Service-provider regions and retention policies must be kept current, and required disclosures/consents must be implemented in the app. A shared policy does not remove service-specific disclosure obligations or establish compliance by itself.

References reviewed:

- Google Play privacy policy: https://support.google.com/googleplay/android-developer/answer/9859455?hl=ko
- User data: https://support.google.com/googleplay/android-developer/answer/10144311?hl=ko
- Account deletion: https://support.google.com/googleplay/android-developer/answer/13327111?hl=ko
- Personal Information Protection Act, article 30: https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1020398435
- Overseas transfer, article 28-8: https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029334869
- Firebase processing, US authentication and deletion timelines: https://firebase.google.com/support/privacy
- OSM Foundation location and request processing: https://osmfoundation.org/wiki/Privacy_Policy
