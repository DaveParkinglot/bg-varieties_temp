### `BgVarieties(options)`

A background generator component that renders beautiful, dynamic canvas animations as a background behind your Quartz site. It features four distinct, highly configurable styles:

1. **Perlin Noise** (`"perlin-noise"`): A flowing vector field guided by 2D Perlin noise.
2. **Fractals** (`"fractals"`): A recursive fractal tree canopy that sways gently in the wind.
3. **Vector** (`"vector"`): A floating constellation node network with lines connecting close elements.
4. **Dots** (`"dots"`): Soft, glowing floating bokeh circles.

#### Usage in Quartz Layout

To add the background variety to your Quartz site, import and add it to your layouts:

```ts
import { BgVarieties } from "@quartz-community/bg-varieties"

export const sharedPageComponents: SharedPageComponents = {
  head: Component.Head(),
  header: [],
  afterBody: [
    BgVarieties({
      type: "perlin-noise",
      opacity: 0.35,
      zIndex: -2,
      speedMultiplier: 1.0,
      density: 50,
      interactive: true,
      palette: "cosmic"
    })
  ],
}
```

#### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"perlin-noise" \| "fractals" \| "vector" \| "dots"` | `"vector"` | The active animation pattern. |
| `zIndex` | `number` | `-2` | Z-index layer for the canvas container. |
| `opacity` | `number` | `0.4` | Opacity of the background canvas (0.0 to 1.0). |
| `speedMultiplier` | `number` | `1.0` | Speed modifier for the animation loop. |
| `density` | `number` | `50` | Quantity/density scale for particles, lines, etc. (1 to 100). |
| `interactive` | `boolean` | `true` | Enables mouse tracking (repulsion, wind pull, constellation connection). |
| `theme` | `"auto" \| "light" \| "dark"` | `"auto"` | Forces dark/light coloring or detects it dynamically. |
| `palette` | `"cosmic" \| "aurora" \| "nebula" \| "sunset" \| "minimalist" \| string[]` | `"cosmic"` | Color palette preset or a custom array of colors. |

## Testing

```bash
npm test
```

## Build and lint

```bash
npm run build
npm run lint
npm run format
```

## Publishing

Tags matching `v*` trigger the GitHub Actions publish workflow. Ensure `NPM_TOKEN` is set in the
repository secrets.

## Component Plugins (UI Components)

In addition to transformer/filter/emitter plugins, you can create **component plugins** that provide
UI elements for Quartz layouts. See `src/components/ExampleComponent.tsx` for a reference.

### Component Pattern

```tsx
import type { QuartzComponent, QuartzComponentConstructor } from "@quartz-community/types";
import style from "./styles/example.scss";
import script from "./scripts/example.inline.ts";

export default ((opts?: MyComponentOptions) => {
  const Component: QuartzComponent = (props) => {
    return <div class="my-component">...</div>;
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor;
```

### Receiving YAML Options in Component-Only Plugins

Processing plugins (transformers, filters, emitters, page types) receive options automatically
through their factory function. **Component-only plugins** (those with `"category": ["component"]`)
are loaded via side-effect import and need an extra step to receive YAML options.

Export an `init` function from your plugin's entry point. Quartz's config-loader will call it with
the merged options from `package.json` `defaultOptions` and the user's `quartz.config.yaml`:

```ts
// src/index.ts
export function init(options?: Record<string, unknown>): void {
  // Use the options to configure your plugin
  const myOption = (options?.myOption as boolean) ?? false;
  // e.g. register a view, set global state, etc.
}
```

Then declare default values in your `package.json` manifest:

```json
{
  "quartz": {
    "category": ["component"],
    "defaultOptions": {
      "myOption": false
    }
  }
}
```

Users configure options in `quartz.config.yaml`:

```yaml
plugins:
  - source: github:your-username/my-component-plugin
    enabled: true
    options:
      myOption: true
```

Quartz merges `defaultOptions` with the user's `options` (user values take precedence) and passes
the result to `init()`. If no `init` export exists, the plugin is loaded via side-effect import as
before — no breaking change for existing plugins.

### Client-Side Scripts

Component scripts run in the browser and must handle Quartz's SPA navigation. Key patterns:

1. **Use `@ts-nocheck`** - Client scripts run in a different context than build-time code
2. **Listen to `nav` event** - Fires after each page navigation (including initial load)
3. **Listen to `prenav` event** - Fires before navigation, use for saving state
4. **Use `window.addCleanup()`** - Register cleanup functions for event listeners
5. **Use `fetchData` global** - Access page metadata via the `fetchData` promise (handles base path correctly)

See `src/components/scripts/example.inline.ts` for a complete example with all patterns.

### Common Helper Functions

These utilities are commonly needed in component plugins:

```js
function removeAllChildren(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}

function simplifySlug(slug) {
  return slug.endsWith("/index") ? slug.slice(0, -6) : slug;
}

function getCurrentSlug() {
  let slug = window.location.pathname;
  if (slug.startsWith("/")) slug = slug.slice(1);
  if (slug.endsWith("/")) slug = slug.slice(0, -1);
  return slug || "index";
}
```

### State Persistence

Use `localStorage` for persistent state (survives browser close) and `sessionStorage` for
temporary state (like scroll positions):

```js
localStorage.setItem("myPlugin-state", JSON.stringify(state));
sessionStorage.setItem("myPlugin-scrollTop", element.scrollTop.toString());
```

## Migration Guide (from Quartz v4)

When migrating a v4 component to a standalone plugin:

1. **Replace Quartz imports** with `@quartz-community/types`
2. **Copy utility functions** (path helpers, DOM utils) into your plugin
3. **Use `@ts-nocheck`** for inline scripts that can't be type-checked
4. **Use the `fetchData` global** to access `contentIndex.json` with the correct base path
5. **Test with both local and production builds**

## License

MIT
