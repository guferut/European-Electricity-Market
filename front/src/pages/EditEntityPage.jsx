import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { updateEntity, removeEntity } from '../redux/features/entity/entitySlice';

const EditEntityPage = () => {
  const [entity, setEntity] = useState(null);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [marketShare, setMarketShare] = useState('');
  const [renewableEnergy, setRenewableEnergy] = useState('');
  const [yearlyRevenue, setYearlyRevenue] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const { data } = await axios.get(`/entities/${id}`);
        setEntity(data);
        setName(data.name);
        setCountry(data.country);
        setMarketShare(data.marketShare.toString());
        setRenewableEnergy(data.renewableEnergy.toString());
        setYearlyRevenue(data.yearlyRevenue.toString());
      } catch (error) {
        console.error('Error fetching entity:', error);
        toast.error(`Failed to fetch entity details: ${error.message}`);
      }
    };

    fetchEntity();
  }, [id]);

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

  const updateEntityHandler = async () => {
    try {
      if (!validateInputs()) return;

      const updatedEntity = {
        name,
        country,
        marketShare: parseFloat(marketShare),
        renewableEnergy: parseFloat(renewableEnergy),
        yearlyRevenue: parseFloat(yearlyRevenue),
      };

      await axios.put(`/entities/${id}`, updatedEntity);
      dispatch(updateEntity({ id, updatedEntity }));
      toast.success('Entity updated successfully');
      navigate('/entities');
    } catch (error) {
      console.error('Error updating entity:', error);
      toast.error(`Failed to update entity: ${error.message}`);
    }
  };

  const deleteEntityHandler = async () => {
    try {
      await dispatch(removeEntity(id));
      toast.success('Entity deleted successfully');
      navigate('/entities');
    } catch (error) {
      console.error('Error deleting entity:', error);
      toast.error(`Failed to delete entity: ${error.message}`);
    }
  };

  if (!entity) {
    return (
      <div className="text-xl text-center text-white py-10">
        Loading...
      </div>
    );
  }

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
          onClick={updateEntityHandler}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2"
        >
          Update
        </button>
        <button
          onClick={deleteEntityHandler}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditEntityPage;
