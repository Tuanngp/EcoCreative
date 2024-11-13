import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, RefreshCwIcon, Lightbulb, Users, ChevronRight, Star, Palette, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import BaseLayout from '../../common/Layout';

const HomePage = () => {
    const navigate = useNavigate();
    const [featuredCategory, setFeaturedCategory] = useState('furniture');
    
    const HandleRegisterClick = () => {
        navigate('/register');
    };

    const categories = [
        { id: 'furniture', name: 'Nội thất', count: '120+' },
        { id: 'clothing', name: 'Quần áo', count: '250+' },
        { id: 'electronics', name: 'Đồ điện tử', count: '80+' },
        { id: 'accessories', name: 'Phụ kiện', count: '150+' }
    ];

    const recentPosts = [
        {
            id: 1,
            title: 'Biến chai nhựa thành chậu cây độc đáo',
            author: 'Green Designer',
            likes: 234,
            image: 'https://wall.vn/wp-content/uploads/2020/04/anh-dep-viet-nam-17.jpg'
        },
        {
            id: 2,
            title: 'DIY: Tủ sách từ thùng gỗ cũ',
            author: 'EcoArtist',
            likes: 186,
            image: 'https://wall.vn/wp-content/uploads/2020/04/anh-dep-viet-nam-17.jpg'
        },
        {
            id: 3,
            title: 'Làm mới ghế sofa cũ',
            author: 'CreativeUpcycler',
            likes: 156,
            image: 'https://wall.vn/wp-content/uploads/2020/04/anh-dep-viet-nam-17.jpg'
        }
    ];

    const featuredArtists = [
        {
            id: 1,
            name: 'Hana Creative',
            specialty: 'Nội thất gỗ',
            rating: 4.8,
            projects: 45,
            avatar: 'https://wall.vn/wp-content/uploads/2020/04/anh-dep-viet-nam-17.jpg'
        },
        {
            id: 2,
            name: 'EcoStyle',
            specialty: 'Tái chế thời trang',
            rating: 4.9,
            projects: 67,
            avatar: 'https://wall.vn/wp-content/uploads/2020/04/anh-dep-viet-nam-17.jpg'
        }
    ];

    return (
        <BaseLayout>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-green-600 to-green-400 text-white py-24">
                    <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                    <div className="container mx-auto text-center px-4">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-5xl font-bold mb-6"
                        >
                            Biến đồ cũ thành kho báu sáng tạo
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-2xl mb-10 max-w-2xl mx-auto"
                        >
                            Khám phá thế giới của tái chế sáng tạo và kết nối với cộng đồng yêu môi trường
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="flex justify-center gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-green-600 font-bold py-3 px-8 rounded-full hover:bg-green-50 transition duration-300"
                            >
                                Khám phá ngay
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-green-600 transition duration-300"
                            >
                                Xem hướng dẫn
                            </motion.button>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Categories */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center mb-12">Danh mục nổi bật</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {categories.map((category) => (
                                <motion.div
                                    key={category.id}
                                    whileHover={{ y: -5 }}
                                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                                        featuredCategory === category.id
                                            ? 'bg-green-50 border-2 border-green-500'
                                            : 'bg-gray-50 hover:bg-green-50'
                                    }`}
                                    onClick={() => setFeaturedCategory(category.id)}
                                >
                                    <h4 className="text-xl font-bold mb-2">{category.name}</h4>
                                    <p className="text-gray-600">{category.count} sản phẩm</p>
                                    <ChevronRight className="mt-4 text-green-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recent Posts/Ideas */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center mb-12">Ý tưởng mới nhất</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {recentPosts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg"
                                >
                                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <h4 className="text-xl font-bold mb-2">{post.title}</h4>
                                        <p className="text-gray-600 mb-4">bởi {post.author}</p>
                                        <div className="flex items-center text-green-500">
                                            <Heart className="w-5 h-5 mr-2" />
                                            <span>{post.likes} lượt thích</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Artists */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center mb-12">Nghệ sĩ tiêu biểu</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {featuredArtists.map((artist) => (
                                <motion.div
                                    key={artist.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center bg-gray-50 rounded-xl p-6"
                                >
                                    <img
                                        src={artist.avatar}
                                        alt={artist.name}
                                        className="w-20 h-20 rounded-full object-cover mr-6"
                                    />
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{artist.name}</h4>
                                        <p className="text-gray-600 mb-2">{artist.specialty}</p>
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                            <span className="mr-4">{artist.rating}</span>
                                            <Palette className="w-5 h-5 text-green-500 mr-1" />
                                            <span>{artist.projects} dự án</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h3 className="text-3xl font-bold text-center mb-12">Tính năng chính</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard
                                icon={<ShoppingBag size={40} />}
                                title="Chợ đồ cũ"
                                description="Mua bán, trao đổi các vật dụng không dùng nữa một cách dễ dàng."
                            />
                            <FeatureCard
                                icon={<RefreshCwIcon size={40} />}
                                title="Ý tưởng tái chế"
                                description="Khám phá vô vàn ý tưởng sáng tạo để làm mới đồ vật cũ."
                            />
                            <FeatureCard
                                icon={<Lightbulb size={40} />}
                                title="Hướng dẫn DIY"
                                description="Học cách tự tay làm mới đồ vật với các hướng dẫn chi tiết."
                            />
                            <FeatureCard
                                icon={<Users size={40} />}
                                title="Kết nối sáng tạo"
                                description="Tìm kiếm và hợp tác với các nghệ sĩ để biến ý tưởng thành hiện thực."
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-green-600 to-green-400 py-20">
                    <div className="container mx-auto text-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-white"
                        >
                            <h3 className="text-4xl font-bold mb-6">Sẵn sàng để sáng tạo?</h3>
                            <p className="text-xl mb-8 max-w-2xl mx-auto">
                                Tham gia cộng đồng EcoCreative ngay hôm nay và bắt đầu hành trình tái chế sáng tạo của bạn!
                            </p>
                            <motion.button
                                onClick={HandleRegisterClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-green-600 font-bold py-3 px-8 rounded-full hover:bg-green-50 transition duration-300"
                            >
                                Đăng ký miễn phí
                            </motion.button>
                        </motion.div>
                    </div>
                </section>
            </div>
        </BaseLayout>
    );
};

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-xl shadow-lg text-center"
    >
        <div className="text-green-500 mb-6">{icon}</div>
        <h4 className="text-xl font-bold mb-4">{title}</h4>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

export default HomePage;