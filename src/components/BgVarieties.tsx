import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types";
import type { BgVarietiesOptions } from "../types";
import style from "./styles/bg-varieties.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/bg-varieties.inline.ts";

export default ((opts?: BgVarietiesOptions) => {
  const options = opts ?? {};
  const zIndex = options.zIndex ?? -2;

  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    return (
      <div
        class="bg-varieties-container"
        style={{ zIndex }}
        data-options={JSON.stringify(options)}
      >
        <canvas class="bg-varieties-canvas" />
      </div>
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor;
export type { BgVarietiesOptions };
