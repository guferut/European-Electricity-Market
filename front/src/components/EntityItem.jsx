import React from 'react';
import Moment from 'react-moment';

export const EntityItem = ({ entity }) => {
    if (!entity) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Loading...
            </div>
        );
    }

    return (
        <div className='flex flex-col bg-gray-800 rounded-lg p-4 mb-4'>
            <div className='flex justify-between items-center'>
                <div className='text-sm text-white'>
                    <span className='font-bold'>Name:</span> {entity.name}
                </div>
                <div className='text-sm text-white opacity-75'>
                    <Moment date={entity.createdAt} format='D MMM YYYY' />
                </div>
            </div>
            <div className='text-white mt-2'>
                <span className='font-bold'>Country:</span> {entity.country}
            </div>
            <div className='text-white mt-2'>
                <span className='font-bold'>Market Share:</span> {entity.marketShare}
            </div>
            <div className='text-white mt-2'>
                <span className='font-bold'>Renewable Energy:</span> {entity.renewableEnergy}
            </div>
            <div className='text-white mt-2'>
                <span className='font-bold'>Yearly Revenue:</span> {entity.yearlyRevenue}
            </div>
        </div>
    );
};
