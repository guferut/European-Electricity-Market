import React, { useEffect, useState, useCallback } from 'react';
import { EntityItem } from '../components/EntityItem';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EntitiesPage = () => {
    const [entities, setEntities] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    console.log('User from state:', user);

    const fetchMyEntities = useCallback(async () => {
        if (!user) {
            console.log('User not found');
            return;
        }

        try {
            const { data } = await axios.get('/entities');
            console.log('Fetched data:', data);

            if (Array.isArray(data)) {
                const filteredEntities = data.filter(entity => {
                    if (entity.user && entity.user._id) {
                        console.log(`Entity user ID: ${entity.user._id}, User ID: ${user._id}`);
                        return entity.user._id === user._id;
                    }
                    return false; // Handle case where entity.user or entity.user._id is missing
                });

                console.log('Filtered entities:', filteredEntities);
                setEntities(filteredEntities);
            } else {
                setError('Data received is not an array: ' + JSON.stringify(data));
            }
        } catch (error) {
            setError(error.message);
        }
    }, [user]);

    useEffect(() => {
        fetchMyEntities();
    }, [fetchMyEntities]);

    const editEntity = (id) => {
        navigate(`/edit-entity/${id}`);
    };

    const deleteEntity = async (id) => {
        try {
            await axios.delete(`/entities/${id}`);
            setEntities(prevEntities => prevEntities.filter(entity => entity._id !== id));
            toast.success('Entity deleted successfully');
        } catch (error) {
            console.error('Error deleting entity:', error);
            toast.error('Error deleting entity');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    if (entities.length === 0) {
        return <div>No entities found</div>;
    }

    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            {entities.map((entity, idx) => (
                <div key={idx} className='rounded-lg shadow-md p-4'>
                    <EntityItem entity={entity} />
                    <div className='flex gap-4 mt-2'>
                        <button
                            onClick={() => editEntity(entity._id)}
                            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteEntity(entity._id)}
                            className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EntitiesPage;
