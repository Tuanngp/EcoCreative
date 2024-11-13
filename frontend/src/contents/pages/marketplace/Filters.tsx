// Filters.tsx

import React, { useState } from 'react';
import { FilterState } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/common/CardComponent";
import { motion } from "framer-motion";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Slider } from "../../../components/common/Slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/common/Select';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 vh-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg font-semibold text-green-800">
              Bộ lọc tìm kiếm
            </CardTitle>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
                }`}
            />
          </motion.button>
        </div>
      </CardHeader>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <CardContent className="space-y-6 pt-2">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Danh mục
            </label>
            <Select
              value={filters.category}
              onValueChange={(value) => onFilterChange({ category: value })}
            >
              <SelectTrigger className="w-full bg-white border-gray-200 hover:bg-gray-50 transition-colors">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent className="w-full h-full z-50 bg-white">
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="clothing">Quần áo</SelectItem>
                <SelectItem value="furniture">Nội thất</SelectItem>
                <SelectItem value="electronics">Đồ điện tử</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <label className="text-sm font-medium text-gray-700">
              Khoảng giá
            </label>
            <Slider
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
              max={10000000}
              step={100000}
              onValueChange={(value) =>
                onFilterChange({ priceRange: value as [number, number] })
              }
              className="my-4"
            />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {formatPrice(filters.priceRange[0])}
              </span>
              <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {formatPrice(filters.priceRange[1])}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-gray-700">
              Tình trạng
            </label>
            <Select
              value={filters.status}
              onValueChange={(value) => onFilterChange({ status: value })}
            >
              <SelectTrigger className="w-full bg-white border-gray-200 hover:bg-gray-50 transition-colors">
                <SelectValue placeholder="Chọn tình trạng" />
              </SelectTrigger>
              <SelectContent className="w-full h-full z-50 bg-white">
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="new">Mới</SelectItem>
                <SelectItem value="used">Đã qua sử dụng</SelectItem>
                <SelectItem value="refurbished">Đã sửa chữa</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-gray-700">
              Sắp xếp theo
            </label>
            <Select
              value={filters.sortBy}
              onValueChange={(value: 'price-asc' | 'price-desc' | 'date' | 'popularity') => onFilterChange({ sortBy: value })}
            >
              <SelectTrigger className="w-full bg-white border-gray-200 hover:bg-gray-50 transition-colors">
                <SelectValue placeholder="Chọn cách sắp xếp" />
              </SelectTrigger>
              <SelectContent className="w-full h-full z-50 bg-white">
                <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                <SelectItem value="date">Mới nhất</SelectItem>
                <SelectItem value="popularity">Phổ biến nhất</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default Filters;