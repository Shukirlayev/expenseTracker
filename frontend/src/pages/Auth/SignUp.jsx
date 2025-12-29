import { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
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

    // Agar foydalanuvchi @ belgisini yozmagan bo'lsa takliflarni chiqarish
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

    // Validatsiya
    if (!fullName) return setError('Please enter your full name.');
    if (!validateEmail(email))
      return setError('Please enter a valid email address.');
    if (password.length < 8)
      return setError('Password must be at least 8 characters long.');

    setError('');

    try {
      let profileImageUrl = '';

      // Rasm mavjud bo'lsa yuklash
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || imgUploadRes.url || '';
      }

      // Ro'yxatdan o'tish
      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      if (data?.token) {
        localStorage.setItem('token', data.token);
        updateUser(data.user);
        navigate('/dashboard');
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Something went wrong. Please try again later.';
      setError(message);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black font-poppins">
          Create an Account
        </h3>
        <p className="text-xs text-slate-700 mt-1.5 mb-6">
          Join us today entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          {/* Responsive Grid Konteyner */}
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
            {/* Full Name */}
            <div className="w-full">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
              />
            </div>

            {/* Email + Suggestions */}
            <div className="relative w-full">
              <Input
                value={email}
                onChange={handleEmailChange}
                label="Email Address"
                placeholder="Enter your email"
                type="email"
              />

              {suggestions.length > 0 && (
                <ul className="absolute z-20 w-full bg-white border border-slate-200 rounded-lg shadow-xl mt-1 max-h-48 overflow-y-auto translate-y-0">
                  {suggestions.map((s, index) => (
                    <li
                      key={index}
                      onClick={() => selectSuggestion(s)}
                      className="p-3 hover:bg-indigo-50 cursor-pointer text-sm text-slate-700 border-b border-slate-50 last:border-none transition-all"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Password - Doim pastda va to'liq eniga */}
            <div className="md:col-span-2 w-full">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Enter your password (min. 8 characters)"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-[11px] mt-2">{error}</p>}

          <button className="btn-primary w-full mt-4 py-3" type="submit">
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
