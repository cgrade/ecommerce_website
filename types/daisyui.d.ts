import type { Config } from 'tailwindcss';

export interface DaisyUIConfig {
  themes?: Array<{
    [key: string]: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
  }>;
}

export interface ConfigWithDaisyUI extends Config {
  daisyui?: DaisyUIConfig;
}

declare module 'daisyui' {
  const daisyui: any;
  export = daisyui;
} 