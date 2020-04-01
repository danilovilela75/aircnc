const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('./configs/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.show);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/booking', BookingController.store);
routes.get('/bookings', BookingController.show);



module.exports = routes;