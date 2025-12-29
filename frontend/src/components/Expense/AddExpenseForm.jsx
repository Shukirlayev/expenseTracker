import React, { useState } from 'react';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const formatNumber = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const unFormatNumber = (value) => value.replace(/,/g, '');

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: '',
    amount: '',
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

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input
        value={income.category}
        onChange={({ target }) => handleChange('category', target.value)}
        label="Kategoriya"
        placeholder="Oziq-ovqat, Ko'ngilochar, va hokazo"
        type="text"
      />

      <Input
        label="Miqdor"
        type="text"
        value={formatNumber(income.amount)}
        onChange={handleAmountChange}
        placeholder="0"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Sana"
        placeholder="DD-MM-YYYY"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          type="button"
          onClick={() => onAddExpense(income)}
        >
          Xarajat qo'shish
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
