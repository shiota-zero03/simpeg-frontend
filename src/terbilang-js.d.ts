declare module "terbilang-js" {
  function terbilang(nominal: number): string;
  export default terbilang;
}

declare module "html-to-docx" {
  const htmlToDocx: (
    element: HTMLElement,
    fileName?: string | null,
    options?: {
      orientation?: "portrait" | "landscape";
      margins?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      };
      lineHeight?: number;
    },
  ) => Promise<Blob>;

  export default htmlToDocx;
}
