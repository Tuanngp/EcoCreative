import { AnimatePresence } from 'framer-motion';
import {
    AlertCircle,
    Calendar,
    Edit,
    Heart,
    LogOut,
    Mail,
    MapPin,
    Package,
    Phone,
    Settings,
    Shield,
    Star
} from 'lucide-react';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '../../../../components/common/Alert';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/common/AvatarComponent';
import { Badge } from '../../../../components/common/BadgeComponent';
import { Button } from '../../../../components/common/ButtonComponent';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/common/CardComponent';
import { Separator } from '../../../../components/common/SeparatorComponent';
import useAuth from '../../../../components/hooks/useAuth';
import BaseLayout from '../../../common/Layout';
import { Product } from '../../marketplace/types';
import FavoritesTab from './FavoritesTab';
import ProductsTab from './ProductsTab';
import SettingsTab from './SettingsTab';
import { UserProfile } from './type';
import TabButton from './TabButton';



const ProfilePage: React.FC = () => {
    const { logout } = useAuth();
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
    ];

    const profile: UserProfile = {
        id: '1',
        name: 'Nguyễn Văn A',
        avatar: 'https://th.bing.com/th/id/OIP.yVumdppQ5j-PNifTwDMYHQHaFS?rs=1&pid=ImgDetMain',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        location: 'Hà Nội, Việt Nam',
        joinDate: '2022-10-23',
        verified: true,
        rating: 4.8,
        totalReviews: 156,
        products: MOCK_PRODUCTS, // Your product list here
        favoriteProducts: MOCK_PRODUCTS, // Favorite products list
    };


    const [activeTab, setActiveTab] = useState<'products' | 'favorites' | 'settings'>('products');
    const [isEditing, setIsEditing] = useState(false);

    return (
        <BaseLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <Card>
                            <CardHeader className="text-center">
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <Avatar className="w-24 h-24">
                                            <AvatarImage src={profile.avatar} />
                                            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {profile.verified && (
                                            <Badge
                                                className="absolute bottom-0 right-0 bg-green-500"
                                                variant="secondary"
                                            >
                                                <Shield className="w-4 h-4 mr-1" />
                                                Đã xác thực
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <CardTitle className="mt-4">{profile.name}</CardTitle>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <span>{profile.rating}</span>
                                    <span>•</span>
                                    <span>{profile.totalReviews} đánh giá</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span>{profile.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone className="w-4 h-4" />
                                        <span>{profile.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span>{profile.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>Tham gia từ {new Date(profile.joinDate).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Chỉnh sửa thông tin
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="w-full justify-start"
                                        onClick={logout}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        <Link to={"/"} >Đăng xuất</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Verification Alert */}
                        {!profile.verified && (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Xác thực tài khoản để tăng độ tin cậy và mở khóa các tính năng bổ sung
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            <TabButton
                                label="Sản phẩm đã đăng"
                                value="products"
                                icon={<Package className="w-4 h-4" />}
                                count={profile.products.length}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            <TabButton
                                label="Sản phẩm yêu thích"
                                value="favorites"
                                icon={<Heart className="w-4 h-4" />}
                                count={profile.favoriteProducts.length}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            <TabButton
                                label="Cài đặt"
                                value="settings"
                                icon={<Settings className="w-4 h-4" />}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </div>

                        <Separator />

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'products' && <ProductsTab products={profile.products} />}

                            {activeTab === 'favorites' && <FavoritesTab favorites={profile.favoriteProducts} />}

                            {activeTab === 'settings' && <SettingsTab />}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default ProfilePage;