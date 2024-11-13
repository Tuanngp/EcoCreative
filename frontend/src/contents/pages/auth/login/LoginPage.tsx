import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../../components/hooks/useAuth';
import BaseLayout from '../../../common/Layout';
import '../../../../assets/css/LoginPage.css';


const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Đăng nhập với:', { username, password });
    try {
      setIsLoading(true);
      try {
        await login(username, password);
        setError('');
        navigate('/');
      } catch (error) {
        setError('Sai tên đăng nhập hoặc mật khẩu');
      }
    } catch (error) {
      if (error instanceof Error && 'resultMessage' in error) {
        setError((error as any).resultMessage);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <BaseLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-300 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-emerald-100 rounded-full opacity-50" />
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-emerald-100 rounded-full opacity-50" />

          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">
            Đăng nhập
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="group relative">
              <User className="absolute top-3 left-3 text-emerald-400 transition-colors duration-300 group-hover:text-emerald-600" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors duration-300 bg-emerald-50/30"
                required
              />
            </div>

            <div className="group relative">
              <Lock className="absolute top-3 left-3 text-emerald-400 transition-colors duration-300 group-hover:text-emerald-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors duration-300 bg-emerald-50/30"
                required
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm bg-red-50 p-2 rounded"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-lg font-medium shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all duration-300 flex items-center justify-center space-x-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <span>Đăng nhập</span>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <Link
                to="/register"
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors duration-300"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors duration-300"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </motion.div>
      </div>
    </BaseLayout>
  );
};

export default LoginPage;
