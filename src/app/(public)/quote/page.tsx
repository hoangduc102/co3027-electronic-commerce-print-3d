"use client";

import { useState, useCallback } from "react";
import { FileUploadZone } from "@/components/quote/file-upload-zone";
import { FileCard } from "@/components/quote/file-card";
import { PriceSummary } from "@/components/quote/price-summary";
import { useFileUpload } from "@/hooks/use-file-upload";
import type { PrintConfig } from "@/lib/types";
import { MATERIALS } from "@/lib/constants";

// Metadata được export từ layout.tsx do đây là client component

const defaultConfig: PrintConfig = {
  technology: "FDM",
  material: "pla",
  color: "#FFFFFF",
  infill: 20,
  layerHeight: 0.2,
  quantity: 1,
  scale: 100,
};

export default function QuotePage() {
  const { files, isUploading, error, uploadFiles, removeFile, clearFiles } =
    useFileUpload();
  const [configs, setConfigs] = useState<Record<string, PrintConfig>>({});

  const getConfig = (fileId: string): PrintConfig => {
    return configs[fileId] || defaultConfig;
  };

  const updateConfig = (fileId: string, config: PrintConfig) => {
    setConfigs((prev) => ({ ...prev, [fileId]: config }));
  };

  const handleFilesSelected = useCallback(
    (fileList: FileList) => {
      uploadFiles(fileList);
    },
    [uploadFiles]
  );

  const handleCheckout = () => {
    // TODO: Navigate to checkout with files and configs
    console.log("Checkout", { files, configs });
  };

  // Calculate prices for summary
  const priceItems = files.map((file) => {
    const config = getConfig(file.id);
    // Simple price calculation inline for summary
    const material = MATERIALS.find((m) => m.id === config.material);
    const scaleFactor = config.scale / 100;
    const scaledVolume = (file.volume || 10) * Math.pow(scaleFactor, 3);
    const weight = scaledVolume * 1.25 * (config.infill / 100);
    const materialCost = weight * (material?.pricePerGram || 500);
    const printTimeCost =
      scaledVolume * 0.5 * (0.2 / config.layerHeight) * 5000;
    const total = (20000 + materialCost + printTimeCost) * config.quantity;

    return {
      name: file.name,
      quantity: config.quantity,
      price: {
        setupFee: 20000,
        materialCost: Math.round(materialCost),
        printTimeCost: Math.round(printTimeCost),
        total: Math.round(total),
        estimatedTime: "2-4 giờ",
      },
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Công cụ Báo giá In 3D
            </h1>
            <p className="text-muted-foreground">
              Upload file 3D của bạn để nhận báo giá tức thì. Hỗ trợ STL, OBJ,
              STEP, 3MF.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Upload Zone */}
              <div className="border-2 border-foreground p-6 bg-card">
                <h2 className="font-bold text-xl mb-4 uppercase tracking-wide">
                  Bước 1: Tải lên File
                </h2>
                <p className="text-muted-foreground mb-4">
                  Để xem chi phí in theo thời gian thực, tải lên file .STL,
                  .OBJ, .STEP hoặc .3MF
                </p>
                <FileUploadZone
                  onFilesSelected={handleFilesSelected}
                  isUploading={isUploading}
                  error={error}
                  onClearError={() => {}}
                />
              </div>

              {/* File Cards */}
              {files.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl uppercase tracking-wide">
                      Bước 2: Cấu hình in
                    </h2>
                    {files.length > 1 && (
                      <button
                        onClick={clearFiles}
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Xóa tất cả
                      </button>
                    )}
                  </div>

                  {files.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      config={getConfig(file.id)}
                      onConfigChange={(config) => updateConfig(file.id, config)}
                      onRemove={() => removeFile(file.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Price Summary */}
            <div className="lg:self-start">
              <PriceSummary items={priceItems} onCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
