import Entity from '../models/entity.js';
import User from '../models/User.js';

// Create Entity
export const createEntity = async (req, res) => {
    try {
        const { name, country, marketShare, renewableEnergy, yearlyRevenue } = req.body;
        const user = await User.findById(req.userId);

        const newEntity = new Entity({
            name,
            country,
            marketShare,
            renewableEnergy,
            yearlyRevenue,
            user: req.userId,
        });

        await newEntity.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { entities: newEntity },
        });

        res.json(newEntity);
    } catch (error) {
        console.error('Error creating entity:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

// Get All Entities
export const getAllEntities = async (req, res) => {
    try {
        const entities = await Entity.find().sort('-createdAt');

        if (!entities || entities.length === 0) {
            return res.status(404).json({ message: 'No entities found' });
        }

        res.json({ entities });
    } catch (error) {
        console.error('Error fetching entities:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

// Get Entity By Id
export const getEntityById = async (req, res) => {
    try {
        const entity = await Entity.findById(req.params.id);

        if (!entity) {
            return res.status(404).json({ message: 'Entity not found' });
        }

        res.json(entity);
    } catch (error) {
        console.error('Error fetching entity by id:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

// Get My Entities
export const getMyEntities = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const entities = await Entity.find({ user: req.userId });

        res.json(entities);
    } catch (error) {
        console.error('Error fetching user entities:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

// Remove Entity
export const removeEntity = async (req, res) => {
    try {
        const entity = await Entity.findByIdAndDelete(req.params.id);

        if (!entity) {
            return res.status(404).json({ message: 'Entity does not exist' });
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: { entities: req.params.id },
        });

        res.json({ message: 'Entity has been removed.' });
    } catch (error) {
        console.error('Error deleting entity:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

// Update Entity
export const updateEntity = async (req, res) => {
    try {
        const { name, country, marketShare, renewableEnergy, yearlyRevenue } = req.body;
        const entityId = req.params.id;

        const entity = await Entity.findById(entityId);

        if (!entity) {
            return res.status(404).json({ message: 'Entity not found' });
        }

        entity.name = name;
        entity.country = country;
        entity.marketShare = marketShare;
        entity.renewableEnergy = renewableEnergy;
        entity.yearlyRevenue = yearlyRevenue;

        await entity.save();

        res.json(entity);
    } catch (error) {
        console.error('Error updating entity:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
