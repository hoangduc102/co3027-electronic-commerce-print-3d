"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import type { PriceBreakdown } from "@/lib/types";

interface PriceSummaryProps {
  items: { name: string; price: PriceBreakdown; quantity: number }[];
  onCheckout: () => void;
}

export function PriceSummary({ items, onCheckout }: PriceSummaryProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price.total, 0);
  const hasItems = items.length > 0;

  return (
    <div className="border-2 border-foreground bg-card sticky top-32">
      <div className="p-4 border-b-2 border-foreground bg-secondary">
        <h3 className="font-bold text-lg">Tổng cộng</h3>
      </div>

      <div className="p-4 space-y-4">
        {hasItems ? (
          <>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="truncate flex-1 mr-2">
                  {item.name}{" "}
                  <span className="text-muted-foreground">
                    ×{item.quantity}
                  </span>
                </span>
                <span className="font-medium">
                  {formatPrice(item.price.total)}
                </span>
              </div>
            ))}

            <div className="border-t-2 border-foreground pt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Số lượng file</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Tổng bản in</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng</span>
                <span className="text-primary">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-semibold gap-2"
              onClick={onCheckout}
            >
              <ShoppingCart className="h-4 w-4" />
              Thêm vào giỏ hàng
            </Button>

            <Button
              variant="outline"
              className="w-full border-2 border-foreground font-semibold gap-2 bg-transparent"
              onClick={onCheckout}
            >
              Thanh toán ngay
              <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-2">Chưa có file nào</p>
            <p className="text-sm">Upload file để bắt đầu</p>
          </div>
        )}
      </div>
    </div>
  );
}
