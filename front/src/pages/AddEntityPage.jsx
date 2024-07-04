import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEntity } from "../redux/features/entity/entitySlice";


export const AddEntityPage = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [marketShare, setMarketShare] = useState("");
  const [renewableEnergy, setRenewableEnergy] = useState("");
  const [yearlyRevenue, setYearlyRevenue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      const data = {
        name,
        country,
        marketShare,
        renewableEnergy,
        yearlyRevenue,
      };
      await dispatch(createEntity(data)).unwrap();
      navigate('/')
    } catch (error) {
      console.error("Failed to create entity:", error);
    }
  };

  const clearFormHandler = () => {
    setName('');
    setCountry('');
    setMarketShare('');
    setRenewableEnergy('');
    setYearlyRevenue('');

  }

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-xs text-white opacity-70">
        Provider name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Provider country:
        <input
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          placeholder="Country"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Market share:
        <input
          type="text"
          onChange={(e) => setMarketShare(e.target.value)}
          value={marketShare}
          placeholder="Market share"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-white opacity-70">
        Renewable energy:
        <input
          type="text"
          onChange={(e) => setRenewableEnergy(e.target.value)}
          value={renewableEnergy}
          placeholder="Renewable energy"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-white opacity-70">
        Yearly revenue:
        <input
          type="text"
          onChange={(e) => setYearlyRevenue(e.target.value)}
          value={yearlyRevenue}
          placeholder="Yearly revenue"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Add
        </button>

        <button onClick={clearFormHandler} className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
          
          Cancel
        </button>
      </div>
    </form>
  );
};
