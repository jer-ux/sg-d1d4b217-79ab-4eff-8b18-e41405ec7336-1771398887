import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ProvisionAnalysis, RedFlag } from "@/lib/contracts/types";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerWithHighlightsProps {
  pdfUrl: string;
  provisions: ProvisionAnalysis[];
  redFlags: RedFlag[];
  contractText: string;
}

interface Highlight {
  page: number;
  text: string;
  type: "provision" | "redFlag";
  severity?: "Low" | "Medium" | "High" | "Critical";
  score?: number;
  title: string;
  description: string;
}

export function PDFViewerWithHighlights({
  pdfUrl,
  provisions,
  redFlags,
  contractText
}: PDFViewerWithHighlightsProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Generate highlights from provisions and red flags
  useEffect(() => {
    const generatedHighlights: Highlight[] = [];

    // Add provision highlights
    provisions.forEach((provision) => {
      const highlight: Highlight = {
        page: 1, // TODO: Detect actual page from text position
        text: provision.name,
        type: "provision",
        score: provision.score,
        title: provision.name,
        description: provision.description
      };
      generatedHighlights.push(highlight);
    });

    // Add red flag highlights
    redFlags.forEach((flag) => {
      const highlight: Highlight = {
        page: 1, // TODO: Detect actual page from text position
        text: flag.title,
        type: "redFlag",
        severity: flag.severity as "Low" | "Medium" | "High" | "Critical",
        title: flag.title,
        description: flag.description
      };
      generatedHighlights.push(highlight);
    });

    setHighlights(generatedHighlights);
  }, [provisions, redFlags]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleHighlightClick = (highlight: Highlight) => {
    setSelectedHighlight(highlight);
    setCurrentPage(highlight.page);
  };

  const getHighlightColor = (highlight: Highlight) => {
    if (highlight.type === "provision") {
      const score = highlight.score || 0;
      if (score >= 80) return "bg-green-500/20 border-green-500";
      if (score >= 60) return "bg-yellow-500/20 border-yellow-500";
      return "bg-red-500/20 border-red-500";
    }
    
    // Red flags
    switch (highlight.severity) {
      case "Critical": return "bg-red-600/30 border-red-600";
      case "High": return "bg-orange-500/30 border-orange-500";
      case "Medium": return "bg-yellow-500/30 border-yellow-500";
      default: return "bg-blue-500/30 border-blue-500";
    }
  };

  const filteredHighlights = highlights.filter((h) =>
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* PDF Viewer - 2/3 width */}
      <div className="lg:col-span-2">
        <Card className="p-4">
          {/* PDF Toolbar */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} / {numPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage >= numPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={pdfUrl} download>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>
            </div>
          </div>

          {/* PDF Display */}
          <ScrollArea className="h-[800px] w-full border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-center p-4">
              {loading && (
                <div className="flex items-center justify-center h-[800px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center justify-center h-[800px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                }
              >
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Highlights Sidebar - 1/3 width */}
      <div className="lg:col-span-1">
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Analysis Highlights</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {highlights.length} items found in contract
              </p>
              
              {/* Search Highlights */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search highlights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Highlights List */}
            <ScrollArea className="h-[700px]">
              <div className="space-y-3">
                {filteredHighlights.map((highlight, index) => (
                  <button
                    key={index}
                    onClick={() => handleHighlightClick(highlight)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                      getHighlightColor(highlight)
                    } ${
                      selectedHighlight === highlight
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-medium text-sm">{highlight.title}</span>
                      {highlight.type === "provision" ? (
                        <Badge
                          variant={
                            (highlight.score || 0) >= 80
                              ? "default"
                              : (highlight.score || 0) >= 60
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {highlight.score}/100
                        </Badge>
                      ) : (
                        <Badge
                          variant={
                            highlight.severity === "Critical"
                              ? "destructive"
                              : highlight.severity === "High"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {highlight.severity}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {highlight.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        Page {highlight.page}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {highlight.type === "provision" ? "Provision" : "Red Flag"}
                      </Badge>
                    </div>
                  </button>
                ))}

                {filteredHighlights.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No highlights match your search</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </Card>
      </div>
    </div>
  );
}