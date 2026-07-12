export type {
  BuildCtx,
  ChangeEvent,
  CSSResource,
  JSResource,
  ProcessedContent,
  QuartzEmitterPlugin,
  QuartzEmitterPluginInstance,
  QuartzFilterPlugin,
  QuartzFilterPluginInstance,
  QuartzPluginData,
  QuartzTransformerPlugin,
  QuartzTransformerPluginInstance,
  StaticResources,
  PageMatcher,
  PageGenerator,
  VirtualPage,
  QuartzPageTypePlugin,
  QuartzPageTypePluginInstance,
} from "@quartz-community/types";



export interface BgVarietiesOptions {
  /**
   * The type of background variety to generate:
   * - "perlin-noise": Particle flow field guided by 2D Perlin noise.
   * - "fractals": A beautiful recursive tree that sways in the wind.
   * - "vector": Constellation network with connecting nodes.
   * - "dots": Soft, glowing floating bokeh/particle circles.
   * Defaults to "vector".
   */
  type?: "perlin-noise" | "fractals" | "vector" | "dots";
  /**
   * Z-index value for the canvas container.
   * Defaults to -2.
   */
  zIndex?: number;
  /**
   * Opacity of the background canvas (0 to 1).
   * Defaults to 0.4.
   */
  opacity?: number;
  /**
   * Animation speed multiplier (higher is faster).
   * Defaults to 1.0.
   */
  speedMultiplier?: number;
  /**
   * Quantity of elements (particles, nodes, branches, etc.).
   * Ranges from 1 to 100.
   * Defaults to 50.
   */
  density?: number;
  /**
   * Enable interactive mouse responsiveness (attract, repel, or wind).
   * Defaults to true.
   */
  interactive?: boolean;
  /**
   * Theme configuration:
   * - "auto": Adapt colors automatically to current Quartz light/dark modes.
   * - "light": Force light theme styling.
   * - "dark": Force dark theme styling.
   * Defaults to "auto".
   */
  theme?: "auto" | "light" | "dark";
  /**
   * Color palette preset or custom array of colors.
   * - "cosmic": Purples, indigos, pinks.
   * - "aurora": Teals, emeralds, deep blues.
   * - "nebula": Magentas, purples, cyans.
   * - "sunset": Warm pinks, oranges, purples.
   * - "minimalist": Grays and soft monochrome accents.
   * - Or a custom string array of colors (e.g. ["#ff0000", "#00ff00"]).
   * Defaults to "cosmic".
   */
  palette?: "cosmic" | "aurora" | "nebula" | "sunset" | "minimalist" | string[];
}

