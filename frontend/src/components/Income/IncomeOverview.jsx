import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { prepareIncomeBarChartData } from '../../utils/helper';
import CustomBarChart2 from '../Charts/CustomBarChart2';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-medium">Daromad tahlili</h5>
          <p className="text-sm text-gray-400 mt-0.5">
            Vaqt davomida daromadlaringizni kuzating va moliyaviy holatingizni
            tahlil qiling
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Daromad qo‘shish
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart2 data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
