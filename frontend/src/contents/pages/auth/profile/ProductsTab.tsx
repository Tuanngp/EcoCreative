import { Badge, Edit2, Eye, Grid, Heart, List, Package, Search, Trash2 } from "lucide-react";
import { Card, CardContent } from "../../../../components/common/CardComponent";
import { useState } from "react";

import { Input } from "../../../../components/common/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/common/Select";
import { Button } from "../../../../components/common/ButtonComponent";
import { Product } from "../../marketplace/types";
// import { Product } from "./type";



const ProductsTab: React.FC<{ products: Product[] }> = ({ products }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="active">Đang bán</SelectItem>
                            <SelectItem value="pending">Chờ duyệt</SelectItem>
                            <SelectItem value="sold">Đã bán</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex border rounded-lg">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="icon"
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="icon"
                            onClick={() => setViewMode('list')}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Product Grid/List */}
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredProducts.map((product) => (
                    <Card key={product.id} className={viewMode === 'list' ? 'flex' : ''}>
                        <div className={`relative ${viewMode === 'list' ? 'w-48' : 'w-full'}`}>
                            <img
                                src={product.images[0] || "/api/placeholder/300/200"}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <Badge 
                                className={`absolute top-2 right-2 ${
                                    product.status === 'active' ? 'bg-green-500' :
                                    product.status === 'pending' ? 'bg-yellow-500' :
                                    'bg-gray-500'
                                }`}
                            >
                                {product.status === 'active' ? 'Đang bán' :
                                 product.status === 'pending' ? 'Chờ duyệt' :
                                 'Đã bán'}
                            </Badge>
                        </div>
                        <CardContent className={`${viewMode === 'list' ? 'flex-1' : ''} p-4`}>
                            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                            <p className="text-2xl font-bold text-green-600 mb-4">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {product.views}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    {product.likes}
                                </div>
                                <div>{new Date(product.createdAt).toLocaleDateString('vi-VN')}</div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Sửa
                                </Button>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Xóa
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        Không tìm thấy sản phẩm nào
                    </h3>
                    <p className="mt-2 text-gray-600">
                        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductsTab;