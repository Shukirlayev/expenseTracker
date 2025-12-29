import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#875CF5', '#FA2C37', '#FF6900'];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const balanceData = [
    { name: 'Umumiy balans', amount: totalBalance },
    { name: 'Umumiy xarajatlar', amount: totalExpenses },
    { name: 'Umumiy daromad', amount: totalIncome },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">Moliyaviy hisobot</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label={'Umumiy balans'}
        totalAmount={totalBalance}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
