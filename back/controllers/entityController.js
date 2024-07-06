import EntityModel from "../models/entity.js";
import UserModel from "../models/User.js";

// Отримати всі сутності
export const getAll = async (req, res) => {
  try {
    const entities = await EntityModel.find().populate("user").exec();

    res.json(entities);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get entities",
    });
  }
};

// Отримати мої сутності користувача
export const getMyEntities = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = await Promise.all(
      user.entities.map((entity) => {
        return EntityModel.findById(entity._id);
      }),
    );

    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get user entities' });
  }
};

// Отримати одну сутність за ідентифікатором
export const getOne = async (req, res) => {
  try {
    const entityId = req.params.id;
    const entity = await EntityModel.findById(entityId).populate("user").exec();

    if (!entity) {
      return res.status(404).json({
        message: "Entity not found",
      });
    }

    res.json(entity);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get entity",
    });
  }
};

// Видалити сутність за ідентифікатором
export const remove = async (req, res) => {
  try {
    const entityId = req.params.id;
    const doc = await EntityModel.findByIdAndDelete(entityId);

    if (!doc) {
      return res.status(404).json({
        message: "Entity not found",
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete entity",
    });
  }
};

// Оновити сутність за ідентифікатором
export const update = async (req, res) => {
  try {
    const entityId = req.params.id;

    const updatedEntity = await EntityModel.findByIdAndUpdate(
      entityId,
      {
        name: req.body.name,
        country: req.body.country,
        marketShare: Number(req.body.marketShare),
        renewableEnergy: Number(req.body.renewableEnergy),
        yearlyRevenue: Number(req.body.yearlyRevenue),
      },
      { new: true } // Параметр { new: true } для повернення оновленого документа
    );

    if (!updatedEntity) {
      return res.status(404).json({
        message: "Entity not found",
      });
    }

    res.json(updatedEntity);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update entity",
    });
  }
};

// Створити нову сутність
export const create = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const doc = new EntityModel({
      name: req.body.name,
      country: req.body.country,
      marketShare: Number(req.body.marketShare),
      renewableEnergy: Number(req.body.renewableEnergy),
      yearlyRevenue: Number(req.body.yearlyRevenue),
      user: req.userId,
    });

    const entity = await doc.save();

    // Додати нову сутність до масиву entities користувача
    await UserModel.findByIdAndUpdate(req.userId, {
      $push: { entities: entity._id }
    });

    res.json(entity);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create entity",
    });
  }
};
