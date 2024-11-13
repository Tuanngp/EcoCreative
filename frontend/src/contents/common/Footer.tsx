import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
      <footer className="bg-gradient-to-b from-green-800 to-green-900 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="transform transition duration-300 hover:scale-105">
              <h3 className="text-lg font-bold mb-4 text-green-300">Về EcoCreative</h3>
              <p className="text-gray-100 leading-relaxed">
                Nền tảng kết nối cộng đồng yêu thích tái chế sáng tạo,
                góp phần bảo vệ môi trường và phát triển bền vững.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="transform transition duration-300 hover:scale-105">
              <h3 className="text-lg font-bold mb-4 text-green-300">Liên kết nhanh</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-100 hover:text-green-300 transition-colors duration-300 flex items-center">
                    <span className="absolute opacity-0 -left-4 transition-opacity duration-300">→</span>
                    <span>Giới thiệu</span>
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-100 hover:text-green-300 transition-colors duration-300">Blog</Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-100 hover:text-green-300 transition-colors duration-300">FAQ</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-100 hover:text-green-300 transition-colors duration-300">Liên hệ</Link>
                </li>
              </ul>
            </div>
  
            {/* Legal */}
            <div className="transform transition duration-300 hover:scale-105">
              <h3 className="text-lg font-bold mb-4 text-green-300">Pháp lý</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-gray-100 hover:text-green-300 transition-colors duration-300">Điều khoản sử dụng</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-100 hover:text-green-300 transition-colors duration-300">Chính sách bảo mật</Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-100 hover:text-green-300 transition-colors duration-300">Chính sách vận chuyển</Link>
                </li>
                <li>
                  <Link to="/refund" className="text-gray-100 hover:text-green-300 transition-colors duration-300">Chính sách hoàn tiền</Link>
                </li>
              </ul>
            </div>
  
            {/* Social & Contact */}
            <div className="transform transition duration-300 hover:scale-105">
              <h3 className="text-lg font-bold mb-4 text-green-300">Kết nối với chúng tôi</h3>
              <div className="flex space-x-4 mb-6">
                <a href="facebook" className="text-gray-100 hover:text-green-300 transition-colors duration-300 transform hover:scale-110">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="twitter" className="text-gray-100 hover:text-green-300 transition-colors duration-300 transform hover:scale-110">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="instagram" className="text-gray-100 hover:text-green-300 transition-colors duration-300 transform hover:scale-110">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="mail" className="text-gray-100 hover:text-green-300 transition-colors duration-300 transform hover:scale-110">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
              <div className="text-gray-100 space-y-2">
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-green-300" />
                  contact@ecocreative.com
                </p>
                <p className="flex items-center">
                  <span className="mr-2 text-green-300">📞</span>
                  (84) 123-456-789
                </p>
              </div>
            </div>
          </div>
  
          <div className="border-t border-green-700 mt-12 pt-8 text-center">
            <p className="text-gray-100">&copy; 2024 EcoCreative. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;