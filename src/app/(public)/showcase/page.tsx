"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, Layers, Clock, Ruler } from "lucide-react";

const showcaseProjects = [
  {
    id: "1",
    title: "Tượng Rồng Phong Thủy",
    category: "Decor",
    images: ["/dragon-statue-gold-3d-printed.jpg"],
    material: "Resin Standard",
    technology: "SLA",
    printTime: "8 giờ",
    size: "15 × 10 × 20cm",
    description:
      "Tượng rồng phong thủy được in bằng công nghệ SLA với độ chi tiết cao, sơn phủ màu vàng.",
  },
  {
    id: "2",
    title: "Núm vặn tủ bếp Hexagon",
    category: "Phụ tùng",
    images: ["/hexagon-cabinet-knob-black-3d-printed.jpg"],
    material: "PETG",
    technology: "FDM",
    printTime: "45 phút/núm",
    size: "30 × 30 × 20mm",
    description:
      "Bộ núm vặn tủ bếp thiết kế hexagon hiện đại, in bằng PETG chịu lực tốt.",
  },
  {
    id: "3",
    title: "Figure Chibi Anime",
    category: "Figure",
    images: ["/chibi-anime-figure-3d-printed-colorful.jpg"],
    material: "Resin Standard",
    technology: "SLA",
    printTime: "6 giờ",
    size: "8 × 8 × 12cm",
    description:
      "Figure chibi anime được in resin và sơn tay thủ công với nhiều màu sắc.",
  },
  {
    id: "4",
    title: "Kệ để bút Minimalist",
    category: "Decor",
    images: ["/minimalist-pen-holder-3d-printed-white.jpg"],
    material: "PLA",
    technology: "FDM",
    printTime: "3 giờ",
    size: "10 × 10 × 12cm",
    description:
      "Kệ để bút thiết kế tối giản, in PLA trắng phù hợp với không gian làm việc.",
  },
  {
    id: "5",
    title: "Giá đỡ điện thoại đa năng",
    category: "Dụng cụ",
    images: ["/phone-stand-holder-3d-printed-adjustable.jpg"],
    material: "PETG",
    technology: "FDM",
    printTime: "4 giờ",
    size: "12 × 8 × 10cm",
    description: "Giá đỡ điện thoại có thể điều chỉnh góc, in PETG bền chắc.",
  },
  {
    id: "6",
    title: "Mặt nạ Samurai trang trí",
    category: "Decor",
    images: ["/samurai-mask-wall-decor-3d-printed-gold-black.jpg"],
    material: "PLA",
    technology: "FDM",
    printTime: "12 giờ",
    size: "25 × 20 × 8cm",
    description:
      "Mặt nạ Samurai treo tường, in PLA và sơn phủ vàng-đen cổ điển.",
  },
];

const categories = ["Tất cả", "Decor", "Phụ tùng", "Figure", "Dụng cụ"];

export default function ShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredProjects =
    selectedCategory === "Tất cả"
      ? showcaseProjects
      : showcaseProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="max-w-3xl mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Showcase - Dự án thực tế
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Khám phá các sản phẩm in 3D thực tế từ khách hàng của chúng tôi.
              Tất cả hình ảnh đều là ảnh chụp sản phẩm sau khi hoàn thành.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium border-2 transition-colors ${
                  selectedCategory === category
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-foreground hover:bg-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <div className="group cursor-pointer border-2 border-foreground bg-card overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={project.images[0] || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                        <ZoomIn className="h-8 w-8 text-background opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="p-4">
                      <Badge
                        variant="outline"
                        className="mb-2 border-foreground"
                      >
                        {project.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.material} • {project.technology}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-3xl border-2 border-foreground p-0">
                  <DialogTitle className="sr-only">{project.title}</DialogTitle>
                  <DialogDescription className="sr-only">
                    Chi tiết dự án {project.title} - {project.category}
                  </DialogDescription>
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-square relative">
                      <Image
                        src={project.images[0] || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <Badge
                        variant="outline"
                        className="mb-3 border-foreground"
                      >
                        {project.category}
                      </Badge>
                      <h2 className="text-2xl font-bold mb-3">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {project.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Layers className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Vật liệu & Công nghệ
                            </p>
                            <p className="font-medium">
                              {project.material} ({project.technology})
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Thời gian in
                            </p>
                            <p className="font-medium">{project.printTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Ruler className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Kích thước
                            </p>
                            <p className="font-medium">{project.size}</p>
                          </div>
                        </div>
                      </div>

                      <Button
                        asChild
                        className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground"
                      >
                        <a href="/quote">In sản phẩm tương tự</a>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-8 border-2 border-foreground bg-secondary text-center">
            <h2 className="text-2xl font-bold mb-3">
              Bạn có dự án muốn chia sẻ?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Gửi ảnh sản phẩm in 3D của bạn để được giới thiệu trong Showcase.
              Chúng tôi sẽ tặng mã giảm giá 10% cho đơn hàng tiếp theo.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground">
              Gửi dự án của bạn
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
