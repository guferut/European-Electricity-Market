import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../utils/axios';
import { removeEntity } from '../redux/features/entity/entitySlice';

const EntityPage = () => {
  const [entity, setEntity] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const removeEntityHandler = async () => {
    try {
      await dispatch(removeEntity(params.id));
      toast('Сутність була видалена');
      navigate('/entities');
    } catch (error) {
      console.log(error);
      toast.error('Помилка під час видалення сутності');
    }
  };

  const fetchEntity = useCallback(async () => {
    if (!params.id || params.id === 'undefined') {
      setError('Невірний ідентифікатор');
      return;
    }

    try {
      const { data } = await axios.get(`/entities/${params.id}`);
      setEntity(data);
    } catch (error) {
      console.log(error);
      setError('Не вдалося отримати сутність');
    }
  }, [params.id]);

  useEffect(() => {
    fetchEntity();
  }, [fetchEntity]);

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  if (!entity) {
    return (
      <div className='text-xl text-center text-white py-10'>
        Завантаження...
      </div>
    );
  }

  return (
    <div>
      <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        <Link className='flex' to={'/entities'}>
          Назад
        </Link>
      </button>

      <div className='flex gap-10 py-8'>
        <div className='w-2/3'>
          <div className='flex flex-col gap-4'>
            <div className='text-xs text-white opacity-50'>{entity.name}</div>
            <div className='text-xs text-white opacity-50'>
              <Moment date={entity.createdAt} format='D MMM YYYY' />
            </div>

            <div className='text-white text-xl'>{entity.country}</div>
            <div className='text-white text-xl'>{entity.marketShare}</div>
            <div className='text-white text-xl'>{entity.renewableEnergy}</div>
            <div className='text-white text-xl'>{entity.yearlyRevenue}</div>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          {user?._id === entity.userId && (
            <div className='flex gap-3 items-center mt-4'>
              <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                <Link to={`/${params.id}/edit`}>
                  <AiTwotoneEdit />
                </Link>
              </button>
              <button
                onClick={removeEntityHandler}
                className='flex items-center justify-center gap-2 text-white opacity-50'
              >
                <AiFillDelete />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityPage;
