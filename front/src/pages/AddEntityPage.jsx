import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createEntity } from '../redux/features/entity/entitySlice';

const AddEntityPage = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [marketShare, setMarketShare] = useState('');
  const [renewableEnergy, setRenewableEnergy] = useState('');
  const [yearlyRevenue, setYearlyRevenue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = () => {
    if (!name || !country || !marketShare || !renewableEnergy || !yearlyRevenue) {
      toast.error('Please fill in all fields.');
      return false;
    }

    if (isNaN(parseFloat(marketShare)) || isNaN(parseFloat(renewableEnergy)) || isNaN(parseFloat(yearlyRevenue))) {
      toast.error('Market Share, Renewable Energy, and Yearly Revenue must be numbers.');
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!validateInputs()) return;

      const data = {
        name,
        country,
        marketShare: parseFloat(marketShare),
        renewableEnergy: parseFloat(renewableEnergy),
        yearlyRevenue: parseFloat(yearlyRevenue),
      };

      await dispatch(createEntity(data)).unwrap();
      toast.success('Entity created successfully');
      navigate('/');
    } catch (error) {
      console.error('Failed to create entity:', error);
      toast.error(`Failed to create entity: ${error.message}`);
    }
  };

  const clearFormHandler = () => {
    setName('');
    setCountry('');
    setMarketShare('');
    setRenewableEnergy('');
    setYearlyRevenue('');
  };

  return (
    <div className="w-1/2 mx-auto py-10">
      <h2 className="text-2xl font-bold text-white mb-4">Edit Entity</h2>

      <label className="text-white block mb-4">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="ml-2 py-1 px-2 rounded-lg bg-gray-300 text-black outline-none w-full"
        />
      </label>

      <label className="text-white block mb-4">
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="ml-2 py-1 px-2 rounded-lg bg-gray-300 text-black outline-none w-full"
        />
      </label>

      <label className="text-white block mb-4">
        Market Share:
        <input
          type="text"
          value={marketShare}
          onChange={(e) => setMarketShare(e.target.value)}
          className="ml-2 py-1 px-2 rounded-lg bg-gray-300 text-black outline-none w-full"
        />
      </label>

      <label className="text-white block mb-4">
        Renewable Energy:
        <input
          type="text"
          value={renewableEnergy}
          onChange={(e) => setRenewableEnergy(e.target.value)}
          className="ml-2 py-1 px-2 rounded-lg bg-gray-300 text-black outline-none w-full"
        />
      </label>

      <label className="text-white block mb-4">
        Yearly Revenue:
        <input
          type="text"
          value={yearlyRevenue}
          onChange={(e) => setYearlyRevenue(e.target.value)}
          className="ml-2 py-1 px-2 rounded-lg bg-gray-300 text-black outline-none w-full"
        />
      </label>

      <div className="flex justify-end">
        <button
          onClick={submitHandler}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2"
        >
          Add
        </button>
        <button
          onClick={clearFormHandler}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEntityPage;
