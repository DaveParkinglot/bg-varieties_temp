import { QuartzComponent } from '@quartz-community/types';
import { BgVarietiesOptions } from '../types.js';

interface ExampleComponentOptions {
    prefix?: string;
    suffix?: string;
    className?: string;
}
declare const _default$1: (opts?: ExampleComponentOptions) => QuartzComponent;

declare const _default: (opts?: BgVarietiesOptions) => QuartzComponent;

export { _default as BgVarieties, _default$1 as ExampleComponent, type ExampleComponentOptions };
