import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const formatNumber = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const unFormatNumber = (value) => value.replace(/,/g, '');

const AddIncomeForm = ({ handleAddIncome }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '', // BU YERDA FAFAQAT RAQAM SAQLANADI
    date: '',
    icon: '',
  });

  const handleAmountChange = (e) => {
    const rawValue = unFormatNumber(e.target.value);

    if (!/^\d*$/.test(rawValue)) return; // faqat raqamga ruxsat

    setIncome({
      ...income,
      amount: rawValue,
    });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(icon) => setIncome({ ...income, icon })}
      />

      <Input
        label="Income Source"
        type="text"
        value={income.source}
        onChange={(e) => setIncome({ ...income, source: e.target.value })}
        placeholder="Freelance, Salary, etc."
      />

      <Input
        label="Amount"
        type="text"
        value={formatNumber(income.amount)}
        onChange={handleAmountChange}
        placeholder="0"
      />

      <Input
        label="Date"
        type="date"
        value={income.date}
        onChange={(e) => setIncome({ ...income, date: e.target.value })}
      />

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          onClick={() =>
            handleAddIncome({
              ...income,
              amount: Number(income.amount), // backendga toza number
            })
          }
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
