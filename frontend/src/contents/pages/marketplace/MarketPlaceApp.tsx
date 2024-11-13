import { useState } from 'react';
import {
    AppBar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Toolbar,
    Typography,
    Button,
    Chip,
    styled,
    alpha,
    Rating,
    Avatar,
    Divider,
    Tooltip,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    Search as SearchIcon,
    GridView as GridViewIcon,
    ViewList as ViewListIcon,
    FilterList as FilterListIcon,
    Message as MessageIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    LocationOn as LocationIcon,
    Share as ShareIcon,
    VerifiedUser as VerifiedUserIcon,
    AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import BaseLayout from '../../common/Layout';
// Enhanced styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    overflow: 'visible',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
    },
}));

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    color: 'white',
    height: 36,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 15px 2px rgba(255, 105, 135, .4)',
    },
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 20,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        '& fieldset': {
            borderColor: 'transparent',
        },
        '& input': {
            color: 'white',
            '&::placeholder': {
                color: alpha(theme.palette.common.white, 0.7),
                opacity: 1,
            },
        },
    },
}));

const PriceTag = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    display: 'inline-block',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)',
    },
    transition: 'all 0.2s ease-in-out',
}));

const SellerBadge = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1, 2),
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    marginTop: theme.spacing(2),
}));

// Enhanced Types
interface Product {
    id: number;
    name: string;
    price: number;
    condition: string;
    category: string;
    description: string;
    seller: {
        name: string;
        rating: number;
        verified: boolean;
        avatar: string;
    };
    location: string;
    image: string;
    likes: number;
    postedDate: string;
    tags: string[];
}

const MarketplaceApp = () => {
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [likedProducts, setLikedProducts] = useState<number[]>([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    // Enhanced sample data
    const products: Product[] = [
        {
            id: 1,
            name: "Laptop Dell XPS 13 (2019)",
            price: 12000000,
            condition: "Còn tốt 90%",
            category: "Điện tử",
            description: "Laptop Dell XPS 13 đời 2019, pin còn tốt, máy đẹp. Core i7, RAM 16GB, SSD 512GB. Bảo hành còn 6 tháng tại Dell Việt Nam.",
            seller: {
                name: "Nguyễn Văn A",
                rating: 4.8,
                verified: true,
                avatar: "/api/placeholder/40/40"
            },
            location: "Hà Nội",
            image: "https://th.bing.com/th/id/R.795e8e0951513f7ce6fc1370a540171a?rik=ralFuSA5wXY%2f6A&riu=http%3a%2f%2fdesignwanted.com%2fwp-content%2fuploads%2f2022%2f12%2fThe-future-of-product-design-%e2%80%93-how-artificial-intelligence-is-changing-the-game-cover.jpg&ehk=lh4fjQjQ7%2b5UHwBnOxyo6PPjQeamw88qQ%2fIZRbSpwqI%3d&risl=&pid=ImgRaw&r=0",
            likes: 42,
            postedDate: "2024-03-15",
            tags: ["Laptop", "Dell", "XPS", "Secondhand"]
        },
        {
            id: 2,
            name: "Xe đạp Giant ATX 2021",
            price: 3500000,
            condition: "Đã sử dụng",
            category: "Xe cộ",
            description: "Xe đạp Giant mẫu 2020, đã đi được 2000km. Phụ kiện đầy đủ, bảo dưỡng định kỳ. Thích hợp đi phố và đạp xe thể thao.",
            seller: {
                name: "Trần Thị B",
                rating: 4.5,
                verified: true,
                avatar: "/api/placeholder/40/40"
            },
            location: "TP.HCM",
            image: "https://th.bing.com/th/id/R.795e8e0951513f7ce6fc1370a540171a?rik=ralFuSA5wXY%2f6A&riu=http%3a%2f%2fdesignwanted.com%2fwp-content%2fuploads%2f2022%2f12%2fThe-future-of-product-design-%e2%80%93-how-artificial-intelligence-is-changing-the-game-cover.jpg&ehk=lh4fjQjQ7%2b5UHwBnOxyo6PPjQeamw88qQ%2fIZRbSpwqI%3d&risl=&pid=ImgRaw&r=0",
            likes: 28,
            postedDate: "2024-03-18",
            tags: ["Xe đạp", "Giant", "Thể thao"]
        }
    ];

    const toggleLike = (productId: number) => {
        setLikedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
        setSnackbar({
            open: true,
            message: likedProducts.includes(productId) ? 'Đã bỏ thích sản phẩm' : 'Đã thích sản phẩm',
            severity: 'success'
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const ProductCard = ({ product }: { product: Product }) => (
        <StyledCard>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        display: 'flex',
                        gap: 1,
                    }}
                >
                    <Tooltip title={likedProducts.includes(product.id) ? 'Bỏ thích' : 'Yêu thích'}>
                        <IconButton
                            onClick={() => toggleLike(product.id)}
                            sx={{
                                bgcolor: 'white',
                                '&:hover': { bgcolor: 'white' },
                            }}
                        >
                            {likedProducts.includes(product.id) ? (
                                <FavoriteIcon color="error" />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Chia sẻ">
                        <IconButton
                            sx={{
                                bgcolor: 'white',
                                '&:hover': { bgcolor: 'white' },
                            }}
                        >
                            <ShareIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                    <CategoryChip label={product.category} size="small" />
                </Box>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '3.6em',
                    }}
                >
                    {product.name}
                </Typography>
                <PriceTag variant="subtitle1" gutterBottom>
                    {product.price.toLocaleString('vi-VN')} ₫
                </PriceTag>

                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <LocationIcon sx={{ fontSize: 16 }} />
                        <Typography variant="body2">{product.location}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, color: 'text.secondary' }}>
                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                        <Typography variant="body2">{formatDate(product.postedDate)}</Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                    {product.tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{
                                mr: 0.5,
                                mb: 0.5,
                                bgcolor: alpha('#000', 0.05),
                            }}
                        />
                    ))}
                </Box>
            </CardContent>

            <Divider sx={{ mx: 2 }} />

            <CardActions sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                    <Avatar src={product.seller.avatar} sx={{ width: 32, height: 32 }} />
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="subtitle2">{product.seller.name}</Typography>
                            {product.seller.verified && (
                                <Tooltip title="Người bán đã xác thực">
                                    <VerifiedUserIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                </Tooltip>
                            )}
                        </Box>
                        <Rating value={product.seller.rating} size="small" readOnly precision={0.1} />
                    </Box>
                </Box>
                <GradientButton
                    size="small"
                    startIcon={<MessageIcon />}
                    onClick={() => setSelectedProduct(product)}
                >
                    Liên hệ
                </GradientButton>
            </CardActions>
        </StyledCard>
    );
    const ProductList = ({ product }: { product: Product }) => (
        <Paper
            sx={{
                mb: 2,
                p: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Box
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: 2,
                            '&:hover img': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: 'auto',
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            <Tooltip title={likedProducts.includes(product.id) ? 'Bỏ thích' : 'Yêu thích'}>
                                <IconButton
                                    onClick={() => toggleLike(product.id)}
                                    sx={{
                                        bgcolor: 'white',
                                        '&:hover': { bgcolor: 'white' },
                                    }}
                                >
                                    {likedProducts.includes(product.id) ? (
                                        <FavoriteIcon color="error" />
                                    ) : (
                                        <FavoriteBorderIcon />
                                    )}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Chia sẻ">
                                <IconButton
                                    sx={{
                                        bgcolor: 'white',
                                        '&:hover': { bgcolor: 'white' },
                                    }}
                                >
                                    <ShareIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                            <CategoryChip label={product.category} size="small" sx={{ mb: 1 }} />
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {product.name}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 2, mb: 2 }}>
                        <PriceTag variant="h6">
                            {product.price.toLocaleString('vi-VN')} ₫
                        </PriceTag>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                            <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">{product.location}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">{formatDate(product.postedDate)}</Typography>
                        </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" paragraph>
                        {product.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {product.tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                size="small"
                                sx={{
                                    bgcolor: alpha('#000', 0.05),
                                }}
                            />
                        ))}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar src={product.seller.avatar} />
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Typography variant="subtitle2">{product.seller.name}</Typography>
                                    {product.seller.verified && (
                                        <Tooltip title="Người bán đã xác thực">
                                            <VerifiedUserIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                        </Tooltip>
                                    )}
                                </Box>
                                <Rating value={product.seller.rating} size="small" readOnly precision={0.1} />
                            </Box>
                        </Box>
                        <GradientButton
                            startIcon={<MessageIcon />}
                            onClick={() => setSelectedProduct(product)}
                        >
                            Liên hệ
                        </GradientButton>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );

    return (
        <BaseLayout>
            <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
                <StyledAppBar position="sticky" elevation={0}>
                    <Container>
                        <Toolbar>
                            <Typography
                                variant="h5"
                                sx={{
                                    flexGrow: 1,
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                <Link to={"/"}>Marketplace</Link>
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <SearchTextField
                                    size="small"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: 'white' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ width: { xs: '100%', sm: '300px' } }}
                                />
                                <Tooltip title={viewType === 'grid' ? 'Xem dạng danh sách' : 'Xem dạng lưới'}>
                                    <IconButton color="inherit" onClick={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}>
                                        {viewType === 'grid' ? <ViewListIcon /> : <GridViewIcon />}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Lọc sản phẩm">
                                    <IconButton color="inherit">
                                        <FilterListIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Toolbar>
                    </Container>
                </StyledAppBar>

                <Container sx={{ mt: 4, mb: 4 }}>
                    {viewType === 'grid' ? (
                        <Grid container spacing={3}>
                            {products.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} md={4}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box>
                            {products.map((product) => (
                                <ProductList key={product.id} product={product} />
                            ))}
                        </Box>
                    )}
                </Container>

                <Dialog
                    open={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                        }
                    }}
                >
                    {selectedProduct && (
                        <>
                            <DialogTitle>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                        Chi tiết sản phẩm
                                    </Typography>
                                    <IconButton onClick={() => setSelectedProduct(null)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </DialogTitle>
                            <DialogContent dividers>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                overflow: 'hidden',
                                                borderRadius: 2,
                                                '&:hover img': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        >
                                            <img
                                                src={selectedProduct.image}
                                                alt={selectedProduct.name}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    transition: 'transform 0.3s ease-in-out',
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                            {selectedProduct.name}
                                        </Typography>

                                        <PriceTag variant="h5" sx={{ mb: 2 }}>
                                            {selectedProduct.price.toLocaleString('vi-VN')} ₫
                                        </PriceTag>

                                        <Box sx={{ mb: 3 }}>
                                            <CategoryChip label={selectedProduct.category} />
                                        </Box>

                                        <Typography variant="body1" paragraph>
                                            <strong>Tình trạng:</strong> {selectedProduct.condition}
                                        </Typography>

                                        <Typography variant="body1" paragraph>
                                            <strong>Mô tả:</strong><br />
                                            {selectedProduct.description}
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="body2">{selectedProduct.location}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                                <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="body2">{formatDate(selectedProduct.postedDate)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
                                            {selectedProduct.tags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tag}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: alpha('#000', 0.05),
                                                    }}
                                                />
                                            ))}
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <SellerBadge>
                                            <Avatar
                                                src={selectedProduct.seller.avatar}
                                                sx={{ width: 48, height: 48 }}
                                            />
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        {selectedProduct.seller.name}
                                                    </Typography>
                                                    {selectedProduct.seller.verified && (
                                                        <Tooltip title="Người bán đã xác thực">
                                                            <VerifiedUserIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                                <Rating value={selectedProduct.seller.rating} size="small" readOnly precision={0.1} />
                                            </Box>
                                        </SellerBadge>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions sx={{ p: 2 }}>
                                <Button variant="outlined" onClick={() => setSelectedProduct(null)}>
                                    Đóng
                                </Button>
                                <GradientButton startIcon={<MessageIcon />}>
                                    Liên hệ người bán
                                </GradientButton>
                            </DialogActions>
                        </>
                    )}
                </Dialog>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </BaseLayout>
    );
};

export default MarketplaceApp;