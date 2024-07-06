import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EntityItem } from '../components/EntityItem';
import { getAllEntities } from '../redux/features/entity/entitySlice'; // Оновлений імпорт

export const MainPage = () => {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.entity);

  useEffect(() => {
    dispatch(getAllEntities()); // Виклик коректної функції getAllEntities
  }, [dispatch]);

  if (!entities.length) {
    return (
      <div className='text-xl text-center text-white py-10'>
        Сутностей не існує.
      </div>
    );
  }

  // Сортування сутностей за датою створення в порядку зменшення
  const sortedEntities = [...entities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-10 basis-4/5'>
          {sortedEntities.map((entity) => (
            <EntityItem key={entity._id} entity={entity} />
          ))}
        </div>
      </div>
    </div>
  );
};
