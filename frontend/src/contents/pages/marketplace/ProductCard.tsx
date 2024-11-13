import React, { useState } from 'react';
import { Heart, Star, MapPin, Badge } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../../../components/common/CardComponent';
import { Button } from '../../../components/common/ButtonComponent';
import { Product } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import ProductDetails from './ProductDetails';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const useProductCard = (product: Product) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return {
    currentImageIndex,
    isLiked,
    isHovered,
    showDetails,
    getStatusConfig,
    handleImageNavigation,
    handleCardClick,
    handleCloseDetails,
    setIsLiked,
    setIsHovered
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const {
    currentImageIndex,
    isLiked,
    isHovered,
    showDetails,
    getStatusConfig,
    handleImageNavigation,
    handleCardClick,
    handleCloseDetails,
    setIsLiked,
    setIsHovered
  } = useProductCard(product);

  const ListViewCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="flex">
          <div className="relative w-56 h-56">
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
            {product.images.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {product.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <motion.h3
                  className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  {product.name}
                </motion.h3>
                <motion.p
                  className="text-2xl font-bold text-green-600"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    maximumFractionDigits: 0
                  }).format(product.price)}
                </motion.p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-50"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card click
                    setIsLiked(!isLiked);
                  }}
                >
                  <Heart
                    className={`h-5 w-5 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`}
                  />
                </Button>
              </motion.div>
            </div>

            <p className="mt-3 text-gray-600 line-clamp-2 hover:line-clamp-none transition-all duration-300">
              {product.description}
            </p>

            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <Badge
                className={`
                  ${getStatusConfig(product.status).bg}
                  ${getStatusConfig(product.status).text}
                  hover:opacity-80 transition-opacity duration-300
                `}
              >
                {getStatusConfig(product.status).label}
              </Badge>

              <div className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors duration-300">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{product.seller.rating}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors duration-300">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{product.location}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const GridViewCard = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <Card className="group overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl">
        <div className="relative">
          <div className="relative w-full h-56 overflow-hidden">
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

            {isHovered && product.images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card click
                    handleImageNavigation('prev');
                  }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card click
                    handleImageNavigation('next');
                  }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </>
            )}
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-2 right-2"
          >
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click
                setIsLiked(!isLiked);
              }}
            >
              <Heart
                className={`h-5 w-5 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
              />
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-4">
          <motion.h3
            className="text-lg font-semibold text-gray-800 truncate hover:text-green-600 transition-colors duration-300"
            whileHover={{ scale: 1.01 }}
          >
            {product.name}
          </motion.h3>
          <motion.p
            className="text-xl font-bold text-green-600 mt-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
              maximumFractionDigits: 0
            }).format(product.price)}
          </motion.p>
          <Badge
            className={`
              mt-2
              ${getStatusConfig(product.status).bg}
              ${getStatusConfig(product.status).text}
              hover:opacity-80 transition-opacity duration-300
            `}
          >
            {getStatusConfig(product.status).label}
          </Badge>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors duration-300">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{product.seller.rating}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors duration-300">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{product.location}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );

  return (
    <>
      {viewMode === 'list' ? <ListViewCard /> : <GridViewCard />}
      {showDetails && (
        <ProductDetails
          product={product}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
};

export default ProductCard;