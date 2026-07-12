import { describe, expect, it } from "vitest";
import BgVarieties from "../src/components/BgVarieties";

describe("BgVarieties", () => {
  it("renders a canvas element and data-options", () => {
    const BgVarietiesConstructor = BgVarieties({
      type: "perlin-noise",
      zIndex: -3,
      opacity: 0.5,
    });

    const mockProps = {
      fileData: {},
      allFiles: [],
      displayClass: "after-body",
    } as any;

    const vnode = BgVarietiesConstructor(mockProps);
    expect(vnode).toBeDefined();
    expect(vnode.type).toBe("div");
    expect(vnode.props.class).toBe("bg-varieties-container");
    expect(vnode.props.style.zIndex).toBe(-3);
    
    const options = JSON.parse(vnode.props["data-options"]);
    expect(options.type).toBe("perlin-noise");
    expect(options.opacity).toBe(0.5);

    const canvas = vnode.props.children;
    expect(canvas.type).toBe("canvas");
    expect(canvas.props.class).toBe("bg-varieties-canvas");
  });
});
