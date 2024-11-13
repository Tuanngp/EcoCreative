import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, User, ShoppingBag, Settings, LogOut, X, Menu, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import useAuth from "../../components/hooks/useAuth";

export const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "Có người đã bình luận về bài viết của bạn", time: "5 phút trước" },
    { id: 2, text: "Đơn hàng của bạn đã được xác nhận", time: "1 giờ trước" },
  ]);

  const navItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/marketplace", label: "Chợ đồ cũ" },
    { path: "/ideas", label: "Ý tưởng" },
    { path: "/community", label: "Cộng đồng" },
  ];

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EcoCreative
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className="relative group py-2"
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Bell className="h-6 w-6 hover:text-emerald-200 transition-colors duration-300" />
                      {notifications.length > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center"
                        >
                          {notifications.length}
                        </motion.span>
                      )}
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 bg-white rounded-lg shadow-xl p-2 text-gray-800">
                    <DropdownMenuLabel className="text-lg font-semibold px-4 py-2">
                      Thông báo
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    {notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="px-4 py-3 hover:bg-emerald-50 rounded-lg cursor-pointer group"
                      >
                        <div className="flex justify-between items-start">
                          <span className="flex-1">{notification.text}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {notification.time}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <User className="h-6 w-6 hover:text-emerald-200 transition-colors duration-300" />
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white rounded-lg shadow-xl p-2 text-gray-800">
                    <DropdownMenuLabel className="text-lg font-semibold px-4 py-2">
                      Tài khoản của tôi
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    {[
                      { icon: User, label: "Hồ sơ", path: "/profile" },
                      { icon: ShoppingBag, label: "Đơn hàng", path: "/orders" },
                      { icon: Settings, label: "Cài đặt", path: "/settings" },
                    ].map((item) => (
                      <Link key={item.path} to={item.path}>
                        <DropdownMenuItem className="px-4 py-2 hover:bg-emerald-50 rounded-lg cursor-pointer group flex items-center">
                          <item.icon className="mr-2 h-4 w-4 text-emerald-600" />
                          <span className="group-hover:text-emerald-600 transition-colors">
                            {item.label}
                          </span>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem className="px-4 py-2 hover:bg-red-50 rounded-lg cursor-pointer group flex items-center"
                    onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4 text-red-500" />
                      <span className="group-hover:text-red-500 transition-colors">
                        Đăng xuất
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-emerald-600 px-4 py-2 rounded-lg shadow hover:bg-emerald-50 transition-colors duration-300"
                  >
                    Đăng nhập
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-emerald-600 px-4 py-2 rounded-lg shadow hover:bg-emerald-50 transition-colors duration-300"
                  >
                    Đăng ký
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-2 py-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      className="block px-4 py-2 hover:bg-emerald-500 rounded-lg transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.hr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-emerald-500"
                />
                {isAuthenticated ? (
                  <>
                    {[
                      { path: "/profile", label: "Hồ sơ" },
                      { path: "/settings", label: "Cài đặt" },
                      { path: "/logout", label: "Đăng xuất", className: "text-red-300" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          className={`block px-4 py-2 hover:bg-emerald-500 rounded-lg transition-colors duration-300 ${item.className || ""}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-emerald-500 rounded-lg transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Đăng nhập
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/register"
                        className="block px-4 py-2 hover:bg-emerald-500 rounded-lg transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Đăng ký
                      </Link>
                    </motion.div>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;