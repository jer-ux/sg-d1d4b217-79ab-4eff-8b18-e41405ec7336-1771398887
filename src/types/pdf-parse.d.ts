declare module 'pdf-parse/lib/pdf-parse' {
  function PDFParse(dataBuffer: any, options?: any): Promise<{
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    text: string;
    version: string;
  }>;
  export = PDFParse;
}