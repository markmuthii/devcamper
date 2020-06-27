const express = require('express');
const router = express.Router();
const {
  createBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
  deleteBootcamp,
  getBootcampByRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');

// Include other resource routers
const courseRouter = require('./courses');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/radius/:zipcode/:distance').get(getBootcampByRadius);

router.route('/:id/photo').put(bootcampPhotoUpload); 

module.exports = router;
