export { ExampleTransformer } from "./transformer";
export { ExampleFilter } from "./filter";
export { ExampleEmitter } from "./emitter";
export { default as ExampleComponent } from "./components/ExampleComponent";
export { default as BgVarieties } from "./components/BgVarieties";

export type {
  ExampleTransformerOptions,
  ExampleFilterOptions,
  ExampleEmitterOptions,
  BgVarietiesOptions,
} from "./types";

export type { ExampleComponentOptions } from "./components/ExampleComponent";


// Re-export shared types from @quartz-community/types
export type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
  StringResource,
  QuartzTransformerPlugin,
  QuartzFilterPlugin,
  QuartzEmitterPlugin,
  QuartzPageTypePlugin,
  QuartzPageTypePluginInstance,
  PageMatcher,
  PageGenerator,
  VirtualPage,
} from "@quartz-community/types";

export function init(options?: Record<string, unknown>): void {
  // BgVarieties options are read dynamically from data-options in the browser.
}

