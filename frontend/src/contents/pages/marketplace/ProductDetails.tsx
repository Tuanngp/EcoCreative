import { AnimatePresence, motion } from 'framer-motion';
import {
  Badge,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Shield,
  Star
} from 'lucide-react';
import React, { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../../../components/common/AvatarComponent';
import { Button } from '../../../components/common/ButtonComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/common/CardComponent';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/common/DialogComponent';
import { Separator } from '../../../components/common/SeparatorComponent';
import { Product } from './types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'seller'>('description');
  const getStatusConfig = (status: string) => {
    const configs = {
      new: { bg: 'bg-green-100', text: 'text-green-800', label: 'Mới' },
      used: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Đã qua sử dụng' },
      refurbished: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Đã sửa chữa' }
    };
    return configs[status as keyof typeof configs];
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <Dialog open={product != null} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto bg-white" >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Chi tiết sản phẩm
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImageIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/80'
                      }`}
                  />
                ))}
              </div>

              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                onClick={() => handleImageNavigation('prev')}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                onClick={() => handleImageNavigation('next')}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden ${idx === currentImageIndex
                    ? 'ring-2 ring-green-500'
                    : 'hover:opacity-80'
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`h-5 w-5 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                        }`}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5 text-gray-400" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-bold text-green-600">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                      maximumFractionDigits: 0
                    }).format(product.price)}
                  </p>
                  <Badge
                    className={`
                      ${getStatusConfig(product.status).bg}
                      ${getStatusConfig(product.status).text}
                    `}
                  >
                    {getStatusConfig(product.status).label}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Đăng ngày 23/10/2024</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tabs */}
            <div>
              <div className="flex gap-4 border-b">
                <button
                  className={`pb-2 px-1 text-sm font-medium transition-colors relative ${activeTab === 'description'
                    ? 'text-green-600'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                  onClick={() => setActiveTab('description')}
                >
                  Mô tả sản phẩm
                  {activeTab === 'description' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                      layoutId="activeTab"
                    />
                  )}
                </button>
                <button
                  className={`pb-2 px-1 text-sm font-medium transition-colors relative ${activeTab === 'seller'
                    ? 'text-green-600'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                  onClick={() => setActiveTab('seller')}
                >
                  Thông tin người bán
                  {activeTab === 'seller' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'description' ? (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <p className={`text-gray-600 ${!showFullDescription && 'line-clamp-3'
                      }`}>
                      {product.description}
                    </p>
                    {product.description.length > 150 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-2 text-green-600 text-sm font-medium hover:underline"
                      >
                        {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="seller"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={product.seller.avatar} />
                            <AvatarFallback>
                              {product.seller.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{product.seller.name}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span>{product.seller.rating}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Tham gia 2 năm trước</span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Phone className="h-4 w-4" />
                            Gọi điện
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Nhắn tin
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span>Đã xác thực số điện thoại và email</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;