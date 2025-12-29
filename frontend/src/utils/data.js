import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from 'react-icons/lu';

export const SIDE_MENU_DATA = [
  {
    id: '01',
    label: 'Boshqaruv paneli',
    icon: LuLayoutDashboard,
    path: '/dashboard',
  },
  {
    id: '02',
    label: 'Daromad',
    icon: LuWalletMinimal,
    path: '/income',
  },
  {
    id: '03',
    label: 'Xarajatlar',
    icon: LuHandCoins,
    path: '/expense',
  },
];
