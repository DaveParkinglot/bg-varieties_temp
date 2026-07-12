### `BgVarieties(options)`

A background generator component that renders beautiful, dynamic canvas animations as a background behind your Quartz site. It features four distinct, highly configurable styles:

1. **Perlin Noise** (`"perlin-noise"`): A flowing vector field guided by 2D Perlin noise.
2. **Fractals** (`"fractals"`): A rotating and swaying recursive symmetric fractal mandala centered on the screen.
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