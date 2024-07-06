import { Router } from 'express';
import {
    createEntity,
    getAll,
    getById,
    getMyEntities,
    removeEntity,
    updateEntity,
} from '../controllers/entities.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Create Entity
// POST http://localhost:1924/entities
router.post('/', checkAuth, createEntity);

// Get All Entities
// GET http://localhost:1924/entities
router.get('/', getAll);

// Get My Entities
// GET http://localhost:1924/entities/user/me
router.get('/user/me', checkAuth, getMyEntities);

// Get Entity By Id
// GET http://localhost:1924/entities/:id
router.get('/:id', getById);

// Update Entity
// PUT http://localhost:1924/entities/:id
router.put('/:id', checkAuth, updateEntity);

// Remove Entity
// DELETE http://localhost:1924/entities/:id
router.delete('/:id', checkAuth, removeEntity);

export default router;
