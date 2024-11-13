
import { Search, Heart, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Product } from "../../marketplace/types";
import { Card, CardContent } from "../../../../components/common/CardComponent";
import { Button } from "../../../../components/common/ButtonComponent";
import { Input } from "../../../../components/common/Input";

const FavoritesTab: React.FC<{ favorites: Product[] }> = ({ favorites }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFavorites = favorites.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Tìm kiếm trong danh sách yêu thích..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            <div className="grid gap-4">
                {filteredFavorites.map((product) => (
                    <Card key={product.id} className="flex">
                        <img
                            src={product.images[0] || "/api/placeholder/300/200"}
                            alt={product.name}
                            className="w-48 h-48 object-cover rounded-l-lg"
                        />
                        <CardContent className="flex-1 p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <p className="text-2xl font-bold text-green-600 mb-4">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                    </p>
                                </div>
                                <Button variant="destructive" size="icon">
                                    <Heart className="w-4 h-4" fill="currentColor" />
                                </Button>
                            </div>
                            <Button className="w-full mt-4">
                                Xem chi tiết
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredFavorites.length === 0 && (
                <div className="text-center py-12">
                    <Heart className="w-12 h-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        Chưa có sản phẩm yêu thích
                    </h3>
                    <p className="mt-2 text-gray-600">
                        Hãy thêm sản phẩm vào danh sách yêu thích để xem lại sau
                    </p>
                </div>
            )}
        </div>
    );
};

export default FavoritesTab;