import {
    Camera,
    Edit2,
    LogOut,
    Shield,
    Trash2,
    UserCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/common/CardComponent';

import { Alert, AlertDescription } from '../../../../components/common/Alert';
import { Button } from '../../../../components/common/ButtonComponent';
import { Input } from '../../../../components/common/Input';
import { Label } from '../../../../components/common/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/common/Select';
import { Separator } from '../../../../components/common/SeparatorComponent';
import { Switch } from '../../../../components/common/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/common/Tabs';
import { Textarea } from '../../../../components/common/TextArea';
import { toast } from '../../../../components/common/toast/use-toast';



const SettingsTab: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        address: 'Hà Nội, Việt Nam',
        bio: 'Xin chào! Tôi là người bán hàng uy tín.',
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
        currency: 'VND',
        dateFormat: 'DD/MM/YYYY',
        theme: 'light'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        toast({
            title: 'Thành công',
            description: 'Đã cập nhật thông tin tài khoản',
        });
    };

    const handleDeleteAccount = () => {
        toast({
            title: 'Cảnh báo',
            description: 'Vui lòng liên hệ hỗ trợ để xóa tài khoản',
            variant: 'destructive',
        });
    };

    return (
        <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                <TabsTrigger value="account">Tài khoản</TabsTrigger>
                <TabsTrigger value="notifications">Thông báo</TabsTrigger>
                <TabsTrigger value="privacy">Bảo mật</TabsTrigger>
                <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin cá nhân</CardTitle>
                        <CardDescription>
                            Cập nhật thông tin cá nhân và cách thông tin của bạn được hiển thị
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/api/placeholder/150/150"
                                alt="Avatar"
                                className="rounded-full w-20 h-20 object-cover"
                            />
                            <div className="space-y-2">
                                <Button variant="outline">
                                    <Camera className="w-4 h-4 mr-2" />
                                    Thay đổi ảnh
                                </Button>
                                <p className="text-sm text-gray-500">
                                    Chọn ảnh JPG, PNG. Tối đa 2MB
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Họ và tên</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="bio">Giới thiệu</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="resize-none"
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-white">
                                <div className="grid gap-2">
                                    <Label htmlFor="language">Ngôn ngữ</Label>
                                    <Select 
                                        disabled={!isEditing} 
                                        value={formData.language}>
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Chọn ngôn ngữ" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            <SelectItem value="vi">Tiếng Việt</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="timezone">Múi giờ</Label>
                                    <Select disabled={!isEditing} value={formData.timezone}>
                                        <SelectTrigger id="timezone">
                                            <SelectValue placeholder="Chọn múi giờ" />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            <SelectItem value="Asia/Ho_Chi_Minh">
                                                Hà Nội (GMT+7)
                                            </SelectItem>
                                            <SelectItem value="Asia/Bangkok">
                                                Bangkok (GMT+7)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {isEditing ? (
                            <>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Hủy
                                </Button>
                                <Button onClick={handleSave}>Lưu thay đổi</Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin liên hệ</CardTitle>
                        <CardDescription>
                            Cập nhật thông tin liên hệ và địa chỉ của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                                {!isEditing && (
                                    <Button variant="outline" size="icon">
                                        <Shield className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                                {!isEditing && (
                                    <Button variant="outline" size="icon">
                                        <UserCheck className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Địa chỉ</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông báo qua Email</CardTitle>
                        <CardDescription>
                            Cấu hình cách bạn nhận thông báo qua email
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Thông báo đơn hàng</Label>
                                <CardDescription>
                                    Nhận thông báo khi có đơn hàng mới
                                </CardDescription>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Cập nhật sản phẩm</Label>
                                <CardDescription>
                                    Thông báo khi sản phẩm được duyệt hoặc từ chối
                                </CardDescription>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Tin nhắn mới</Label>
                                <CardDescription>
                                    Thông báo khi có tin nhắn từ người mua
                                </CardDescription>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Thông báo đẩy</CardTitle>
                        <CardDescription>
                            Cấu hình thông báo trên trình duyệt
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Thông báo trên trình duyệt</Label>
                                <CardDescription>
                                    Hiện thông báo ngay trên trình duyệt
                                </CardDescription>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Âm thanh thông báo</Label>
                                <CardDescription>
                                    Phát âm thanh khi có thông báo mới
                                </CardDescription>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Privacy & Security Settings */}
            <TabsContent value="privacy" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Bảo mật tài khoản</CardTitle>
                        <CardDescription>
                            Bảo vệ tài khoản của bạn với các tính năng bảo mật
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="font-medium">Xác thực hai bước</div>
                                <CardDescription>
                                    Thêm lớp bảo mật bổ sung cho tài khoản
                                </CardDescription>
                            </div>
                            <Button variant="outline">
                                <Shield className="w-4 h-4 mr-2" />
                                Thiết lập
                            </Button>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h4 className="font-medium">Phiên đăng nhập</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Chrome trên Windows</div>
                                        <div className="text-xs text-gray-500">Hà Nội • Hoạt động</div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Đăng xuất
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Safari trên iPhone</div>
                                        <div className="text-xs text-gray-500">TP.HCM • 2 giờ trước</div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Đăng xuất
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quyền riêng tư</CardTitle>
                        <CardDescription>
                            Quản lý cách thông tin của bạn được chia sẻ
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Hiển thị số điện thoại</Label>
                                <CardDescription>
                                    Cho phép người dùng khác xem số điện thoại của bạn
                                </CardDescription>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Trạng thái hoạt động</Label>
                                <CardDescription>
                                    Hiển thị khi bạn đang online
                                </CardDescription>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Tìm kiếm qua email</Label>
                                <CardDescription>
                                    Cho phép tìm kiếm tài khoản bằng email
                                </CardDescription>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Advanced Settings */}
            <TabsContent value="advanced" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Tùy chọn nâng cao</CardTitle>
                        <CardDescription>
                            Các tùy chọn cá nhân hóa nâng cao cho tài khoản của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="currency">Định dạng tiền tệ</Label>
                                <Select
                                    disabled={!isEditing}
                                    value={formData.currency}
                                    onValueChange={(value) => handleSelectChange('currency', value)}
                                >
                                    <SelectTrigger id="currency">
                                        <SelectValue placeholder="Chọn định dạng tiền tệ" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white'>
                                        <SelectItem value="VND">VNĐ (₫)</SelectItem>
                                        <SelectItem value="USD">USD ($)</SelectItem>
                                        <SelectItem value="EUR">EUR (€)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="dateFormat">Định dạng ngày tháng</Label>
                                <Select
                                    disabled={!isEditing}
                                    value={formData.dateFormat}
                                    onValueChange={(value) => handleSelectChange('dateFormat', value)}
                                >
                                    <SelectTrigger id="dateFormat">
                                        <SelectValue placeholder="Chọn định dạng ngày tháng" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white'>
                                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="theme">Giao diện</Label>
                                <Select
                                    disabled={!isEditing}
                                    value={formData.theme}
                                    onValueChange={(value) => handleSelectChange('theme', value)}
                                >
                                    <SelectTrigger id="theme">
                                        <SelectValue placeholder="Chọn giao diện" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white'>
                                        <SelectItem value="light">Sáng</SelectItem>
                                        <SelectItem value="dark">Tối</SelectItem>
                                        <SelectItem value="system">Theo hệ thống</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-4">
                            <h4 className="font-medium text-red-600">Vùng nguy hiểm</h4>
                            <div className="grid gap-2">
                                <Label className="text-red-600">Xóa tài khoản</Label>
                                <CardDescription className="text-red-600">
                                    Thao tác này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.
                                </CardDescription>
                                <Button
                                    variant="destructive"
                                    className="w-fit"
                                    onClick={handleDeleteAccount}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Xóa tài khoản
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {isEditing ? (
                            <>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Hủy
                                </Button>
                                <Button onClick={handleSave}>Lưu thay đổi</Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                <Alert>
                    <AlertDescription className="text-sm text-gray-500">
                        Phiên bản ứng dụng: 1.0.0
                        <br />
                        Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
                    </AlertDescription>
                </Alert>
            </TabsContent>
        </Tabs>
    );
};

export default SettingsTab;