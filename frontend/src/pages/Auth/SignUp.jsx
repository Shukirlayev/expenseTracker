import { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) return setError('Iltimos, to‘liq ismingizni kiriting.');
    if (!validateEmail(email))
      return setError('Iltimos, haqiqiy email manzil kiriting.');
    if (password.length < 8)
      return setError('Parol kamida 8 ta belgidan iborat bo‘lishi kerak.');

    setError('');

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl: '',
      });

      if (data?.token) {
        localStorage.setItem('token', data.token);
        updateUser(data.user);
        navigate('/dashboard');
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.';
      setError(message);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black font-poppins">
          Ro‘yxatdan o‘tish
        </h3>
        <p className="text-xs text-slate-700 mt-1.5 mb-6">
          Quyidagi ma’lumotlarni to‘ldirib, bizga qo‘shiling.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <ProfilePhotoSelector />

          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
            <div className="w-full">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="To‘liq ismingiz"
                placeholder="To‘liq ismingizni kiriting"
                type="text"
              />
            </div>

            <div className="relative w-full">
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

            <div className="md:col-span-2 w-full">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Parol"
                placeholder="Parolni kiriting (kamida 8 belgidan)"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-[11px] mt-2">{error}</p>}

          <button className="btn-primary w-full mt-4 py-3" type="submit">
            Ro‘yxatdan o‘tish
          </button>

          <p className="text-[13px] text-slate-800 text-center mt-4">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="font-semibold text-primary underline">
              Kirish
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
