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

  // Email o'zgarganda takliflarni chiqarish
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

  // Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setError('');

    // Login API Call
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
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1.5 mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input with Suggestions */}
          <div className="relative">
            <Input
              value={email}
              onChange={handleEmailChange}
              label="Email Address"
              placeholder="Enter your email"
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
            label="Password"
            placeholder="Enter your password (min. 8 characters)"
            type="password"
          />

          {error && <p className="text-red-500 text-[11px] mb-2">{error}</p>}

          <button className="btn-primary w-full mt-2 py-3" type="submit">
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-4 text-center">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
