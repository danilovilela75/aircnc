const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('./configs/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res) => res.sendFile(path.join(__dirname,'..','build','index.html')));

routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.show);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/booking', BookingController.store);
routes.get('/bookings', BookingController.show);

routes.post('/booking/:booking_id/approvals', ApprovalController.store);
routes.post('/booking/:booking_id/rejects', RejectionController.store);



module.exports = routes;