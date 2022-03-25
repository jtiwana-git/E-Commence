const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
try {
  
const categoriesData = await Category.findAll({
  include: { model: Product },
});
res.status(200).json(categoriesData)

} catch (err) {
  res.status(500).json(err);
  
}

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = await Category.findByPk(req.params.id,{
      include: { model: Product },
    });

    if(!categoryId) {
      res.status(404).json({ message: "No category ID found with that ID" });
      return;
    }
    res.status(200).json(categoryId)
  } catch (err) {
    res.status(500).json(err);    
  }
});

router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create(req.body)
    res.status(200).json(createCategory)

  } catch (err) {
    res.status(500).json(err);    
  }
  
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
try {
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
 });
  res.status(200).json(updateCategory)
} catch (err) {
  res.status(500).json(err)
  
}


});

// NOT WORKING!!
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id,
              }
    })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
