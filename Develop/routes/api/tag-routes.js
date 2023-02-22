const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Tag.findAll({
      include: [
        {model: Product}
      ]
    });
    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product},
      ]
    })
    if (!data) {
      res.status(404).json({ message: 'No product with this id was found.'});
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await Tag.create(req.body,
      {where: {
        tag_name: req.body.name
      }}
    );
    console.log(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Tag.update( req.body,
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data[0]) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: { id: req.params.id,
      },
    })

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
