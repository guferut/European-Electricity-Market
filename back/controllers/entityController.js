import EntityModel from "../models/entity.js";

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

export const update = async (req, res) => {
  try {
    const entityId = req.params.id;

    const result = await EntityModel.updateOne(
      { _id: entityId },
      {
        name: req.body.name,
        country: req.body.country,
        marketShare: Number(req.body.marketShare),
        renewableEnergy: Number(req.body.renewableEnergy),
        yearlyRevenue: Number(req.body.yearlyRevenue),
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({
        message: "Entity not found",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update entity",
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new EntityModel({
      name: req.body.name,
      country: req.body.country,
      marketShare: Number(req.body.marketShare),
      renewableEnergy: Number(req.body.renewableEnergy),
      yearlyRevenue: Number(req.body.yearlyRevenue),
      user: req.userId,
    });

    const entity = await doc.save();

    res.json(entity);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create entity",
    });
  }
};
