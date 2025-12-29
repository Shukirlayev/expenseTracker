import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Expense Tracker
        </h2>
        {children}
      </div>

      {/* Right Side - Visual Design */}
      <div className="hidden md:flex w-[40vw] h-screen relative items-center justify-center bg-linear-to-tr from-purple-100 via-violet-50 to-pink-100 overflow-hidden p-8">
        {/* Floating Cards */}
        <div className="absolute -top-10 -left-5 w-48 h-48 rounded-[40px] bg-linear-to-br from-purple-500 to-purple-300 opacity-70 animate-pulse"></div>
        <div className="absolute top-[25%] -right-10 w-48 h-56 rounded-[40px] bg-linear-to-tr from-pink-400 to-pink-200 opacity-60 animate-spin-slow"></div>
        <div className="absolute -bottom-10 -left-5 w-48 h-48 rounded-[40px] bg-linear-to-br from-violet-400 to-violet-200 opacity-70 animate-pulse"></div>

        {/* Stats Card */}
        <div className="absolute top-[20%] left-8 right-8 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        {/* Decorative Circles */}
        <div className="absolute bottom-16 right-16 w-32 h-32 rounded-full bg-purple-300 opacity-40 blur-2xl"></div>
        <div className="absolute top-32 left-16 w-24 h-24 rounded-full bg-pink-200 opacity-30 blur-xl"></div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-lg shadow-purple-400/10 border border-gray-200/50">
      <div
        className={`w-12 h-12 shrink-0 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1 leading-tight">{label}</h6>
        <span className="text-[20px] font-semibold">${value}</span>
      </div>
    </div>
  );
};
