import { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'];
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !value.includes('@')) {
      setSuggestions(domains.map((domain) => `${value}@${domain}`));
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setEmail(suggestion);
    setSuggestions([]);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Iltimos, haqiqiy email manzil kiriting.');
      return;
    }

    if (password.length < 8) {
      setError('Parol kamida 8 ta belgidan iborat bo‘lishi kerak.');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Kirish amalga oshmadi. Iltimos, qaytadan urinib ko‘ring.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Xush kelibsiz</h3>
        <p className="text-xs text-slate-700 mt-1.5 mb-6">
          Iltimos, kirish uchun ma’lumotlaringizni kiriting
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Input
              value={email}
              onChange={handleEmailChange}
              label="Email manzil"
              placeholder="Email manzilingizni kiriting"
              type="email"
            />

            {suggestions.length > 0 && (
              <ul className="absolute z-20 w-full bg-white border border-slate-200 rounded-lg shadow-xl mt-1 max-h-48 overflow-y-auto">
                {suggestions.map((s, index) => (
                  <li
                    key={index}
                    onClick={() => selectSuggestion(s)}
                    className="p-3 hover:bg-indigo-50 cursor-pointer text-sm text-slate-700 border-b border-slate-50 last:border-none"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Parol"
            placeholder="Parolingizni kiriting (kamida 8 belgidan)"
            type="password"
          />

          {error && <p className="text-red-500 text-[11px] mb-2">{error}</p>}

          <button className="btn-primary w-full mt-2 py-3" type="submit">
            Kirish
          </button>

          <p className="text-[13px] text-slate-800 mt-4 text-center">
            Hisobingiz yo‘qmi?{' '}
            <Link to="/signup" className="font-semibold text-primary underline">
              Ro‘yxatdan o‘tish
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
