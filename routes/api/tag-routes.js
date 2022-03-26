const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try {
  const tagData = await Tag.findAll({
    include: [
      { model: Product, through: ProductTag }
    ],
  });
  res.status(200).json(tagData)
} catch (err) {
  res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
try {
  const tagId = await Tag.findByPk(req.params.id, {
    include: [
      { model: Product, through: ProductTag }
    ],
  });
  if(!tagId) {
    res.status(404).json({message: "No tag ID found with that ID"});
    return;    
  }
  res.status(200).json(tagId)
} catch (err) {
  res.status(500).json(err);   
}


});

router.post('/', async (req, res) => {
  // create a new tag
try {
  const newTag = await Tag.create(req.body);
  res.status(200).json(newTag)
} catch (err) {
  res.status(400).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagUpdate = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.json(tagUpdate);
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
Tag.destroy({
  where: {
    id: req.params.id,
  }
})
.then((tagDeleted) => {
  res.json(tagDeleted);
})
.catch((err) => res.json(err));

});

module.exports = router;
