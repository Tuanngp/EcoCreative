import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import '../../../../assets/css/SignUpPage.css';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../../../components/hooks/useAuth';
import { REGISTER } from '../../../../components/constants/api';
import method from '../../../../components/constants/method';
import { getResultMessage, RESULT_CODE_SUCCESS } from '../../../../components/constants/response';
import { callApi } from '../../../../components/hooks/useApi';
import BaseLayout from '../../../common/Layout';


const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, name, email, password, confirmPassword, agreeTerms } = formData;
    if (!username || !name || !email || !password || !confirmPassword) {
      setIsError('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    if (password !== confirmPassword) {
      setIsError("Mật khẩu không khớp!");
      return;
    }
    if (!agreeTerms) {
      setIsError("Vui lòng đồng ý với điều khoản sử dụng!");
      return;
    }
    setIsLoading(true);
    setFormData((preData) => ({ ...preData, password: '', confirmPassword: '' }));

    const requestData = { username, name, email, password };

    try {
      const response = await callApi({
        path: REGISTER,
        data: requestData,
        method: method.POST,
        errorTitle: 'Registration Error',
      });
      const resultCode = response?.data?.resultCode;
      const resultMessage = getResultMessage(resultCode);
      if (resultCode === RESULT_CODE_SUCCESS) {
        setIsError('');
        navigate('/');
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setIsError(resultMessage);
      }
    } catch (error) {
      setIsError((error as any)?.response?.data?.message || 'Đã có lỗi xảy ra!');
    } finally {
      setIsLoading(false);
    }
  };

  const { username, name, email, password, confirmPassword, agreeTerms } = formData;

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
            Đăng ký
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group relative">
              <User className="absolute top-3 left-3 text-emerald-400 transition-colors duration-300 group-hover:text-emerald-600" />
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Tên đăng nhập"
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors duration-300 bg-emerald-50/30"
                required
              />
            </div>

            <div className="group relative">
              <User className="absolute top-3 left-3 text-emerald-400 transition-colors duration-300 group-hover:text-emerald-600" />
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Họ và tên"
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors duration-300 bg-emerald-50/30"
                required
              />
            </div>

            <div className="group relative">
              <Mail className="absolute top-3 left-3 text-emerald-400 transition-colors duration-300 group-hover:text-emerald-600" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors duration-300 bg-emerald-50/30"
                required
              />
            </div>

            <div className="group relative">
              <Lock className="absolute top-3 left-3 text-emerald-400 transition-colors duration-300 group-hover:text-emerald-600" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors duration-300 bg-emerald-50/30"
                required
              />
            </div>

            <div className="group relative">
              <Lock className="absolute top-3 left-3 text-emerald-400 transition-colors duration-300 group-hover:text-emerald-600" />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu"
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors duration-300 bg-emerald-50/30"
                required
              />
            </div>

            {isError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm bg-red-50 p-2 rounded"
              >
                {isError}
              </motion.p>
            )}

            <div className="flex items-center space-x-2 bg-emerald-50 p-3 rounded-lg">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                Tôi đồng ý với{' '}
                <a href="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                  điều khoản sử dụng
                </a>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-lg font-medium shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all duration-300 flex items-center justify-center space-x-2 mt-6"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang đăng ký...</span>
                </>
              ) : (
                <span>Đăng ký</span>
              )}
            </motion.button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors duration-300"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </motion.div>
      </div>
    </BaseLayout>
  );
};
export default SignUpPage;