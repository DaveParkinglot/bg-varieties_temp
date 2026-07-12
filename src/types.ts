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

export interface ExampleTransformerOptions {
  /** Token used to highlight text, defaults to ==highlight== */
  highlightToken: string;
  /** Add a CSS class to all headings in the rendered HTML. */
  headingClass: string;
  /** Enable remark-gfm for tables/task lists. */
  enableGfm: boolean;
  /** Enable adding slug IDs to headings. */
  addHeadingSlugs: boolean;
}

export interface ExampleFilterOptions {
  /** Allow pages marked draft: true to publish. */
  allowDrafts: boolean;
  /** Exclude pages that contain any of these frontmatter tags. */
  excludeTags: string[];
  /** Exclude paths that start with any of these prefixes (relative to content root). */
  excludePathPrefixes: string[];
}

export interface ExampleEmitterOptions {
  /** Filename to emit at the site root. */
  manifestSlug: string;
  /** Whether to include the frontmatter block in the manifest. */
  includeFrontmatter: boolean;
  /** Extra metadata to write at the top level of the manifest. */
  metadata: Record<string, unknown>;
  /** Optional hook to transform the emitted manifest JSON string. */
  transformManifest?: (json: string) => string;
  /** Add a custom class to the emitted manifest <script> tag if used in HTML. */
  manifestScriptClass?: string;
}

export interface ExampleComponentOptions {
  /** Text to prefix before the title */
  prefix?: string;
  /** Text to suffix after the title */
  suffix?: string;
  /** CSS class name to apply */
  className?: string;
}

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

