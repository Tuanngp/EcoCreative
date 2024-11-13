// MarketplacePage.tsx
import { LayoutGrid, List, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

import { Button } from '../../../components/common/ButtonComponent';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../../components/common/PaginationComponent';
import Filters from './Filters';
import { Product, FilterState } from './types';
import BaseLayout from '../../common/Layout';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ghế văn phòng cao cấp',
    price: 1200000,
    status: 'used',
    description: 'Ghế văn phòng đã qua sử dụng 6 tháng, còn rất tốt',
    images: ['https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'],
    seller: {
      id: 'seller1',
      name: 'Nguyễn Văn A',
      rating: 4.5,
      avatar: 'https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'
    },
    category: 'furniture',
    location: 'Hà Nội',
    createdAt: '2024-03-20',
    views: 0,
    likes: 0
  },
  {
    id: '2',
    name: 'iPhone 12 Pro',
    price: 8500000,
    status: 'refurbished',
    description: 'iPhone đã được sửa chữa và bảo dưỡng toàn bộ',
    images: ['https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'],
    seller: {
      id: 'seller2',
      name: 'Trần Thị B',
      rating: 4.8,
      avatar: 'https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'
    },
    category: 'electronics',
    location: 'TP.HCM',
    createdAt: '2024-03-21',
    views: 0,
    likes: 0
  },
  {
    id: '3',
    name: 'Áo khoác nam',
    price: 450000,
    status: 'new',
    description: 'Áo khoác nam mới 100%, chưa qua sử dụng',
    images: ['https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'],
    seller: {
      id: 'seller3',
      name: 'Lê Văn C',
      rating: 4.2,
      avatar: 'https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'
    },
    category: 'clothing',
    location: 'Đà Nẵng',
    createdAt: '2024-03-22',
    views: 0,
    likes: 0
  },
  {
    id: '4',
    name: 'Áo khoác nam',
    price: 450000,
    status: 'new',
    description: 'Áo khoác nam mới 100%, chưa qua sử dụng',
    images: ['https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'],
    seller: {
      id: 'seller3',
      name: 'Lê Văn C',
      rating: 4.2,
      avatar: 'https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'
    },
    category: 'clothing',
    location: 'Đà Nẵng',
    createdAt: '2024-03-22',
    views: 0,
    likes: 0
  },
  {
    id: '5',
    name: 'Áo khoác nam',
    price: 450000,
    status: 'new',
    description: 'Áo khoác nam mới 100%, chưa qua sử dụng',
    images: ['https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'],
    seller: {
      id: 'seller3',
      name: 'Lê Văn C',
      rating: 4.2,
      avatar: 'https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'
    },
    category: 'clothing',
    location: 'Đà Nẵng',
    createdAt: '2024-03-22',
    views: 0,
    likes: 0
  },
  {
    id: '6',
    name: 'Áo khoác nam',
    price: 450000,
    status: 'new',
    description: 'Áo khoác nam mới 100%, chưa qua sử dụng',
    images: ['https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'],
    seller: {
      id: 'seller3',
      name: 'Lê Văn C',
      rating: 4.2,
      avatar: 'https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'
    },
    category: 'clothing',
    location: 'Đà Nẵng',
    createdAt: '2024-03-22',
    views: 0,
    likes: 0
  },
  {
    id: '7',
    name: 'Áo khoác nam',
    price: 450000,
    status: 'new',
    description: 'Áo khoác nam mới 100%, chưa qua sử dụng',
    images: ['https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'],
    seller: {
      id: 'seller3',
      name: 'Lê Văn C',
      rating: 4.2,
      avatar: 'https://th.bing.com/th/id/OIP.X1Cwkj3IsJZMa8iyYhOlKgHaE5?rs=1&pid=ImgDetMain'
    },
    category: 'clothing',
    location: 'Đà Nẵng',
    createdAt: '2024-03-22',
    views: 0,
    likes: 0
  },
];

const MarketplacePage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: [0, 10000000],
    status: 'all',
    location: '',
    sortBy: 'date'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filter and sort products based on filters
        let filteredProducts = [...MOCK_PRODUCTS];
        
        if (filters.category !== 'all') {
          filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }
        
        if (filters.status !== 'all') {
          filteredProducts = filteredProducts.filter(p => p.status === filters.status);
        }
        
        filteredProducts = filteredProducts.filter(p => 
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );
        
        // Sort products
        filteredProducts.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price-asc':
              return a.price - b.price;
            case 'price-desc':
              return b.price - a.price;
            case 'date':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'popularity':
              return b.seller.rating - a.seller.rating;
            default:
              return 0;
          }
        });
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev:FilterState) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <BaseLayout>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 mr-12">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600">
              Hiển thị {currentProducts.length} trong số {products.length} sản phẩm
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'outline' : 'default'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'outline' : 'default'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : (
            <>
              <div className={`
                grid gap-6
                ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}
              `}>
                {currentProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        //   disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
                        .map(page => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                      
                      {currentPage + 1 < totalPages && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        //   disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {/* No Results */}
              {currentProducts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default MarketplacePage;