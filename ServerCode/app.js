const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config')
const port = 3000;  //port must be changed on an instance - 3001

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.set('jwt-secret', config.secret)

//define the routes
const BluePotRoute = require('./routes/restraunt/bluepot');
const DormitoryRoute = require('./routes/restraunt/dormitory');
const GaonNuriRoute = require('./routes/restraunt/gaonnuri');
const GardenCookRoute = require('./routes/restraunt/gardencook');
const GrootRoute = require('./routes/restraunt/groot');
const NamSanRoute = require('./routes/restraunt/namsan');
const PandorothyRoute = require('./routes/restraunt/pandorothy');
const SangRokOneRoute = require('./routes/restraunt/sangrokone');
const commentRoute = require('./routes/comment');
const loginRoute = require('./routes/api')
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/payment');
const openIDRoute = require('./routes/openID');

//import routes
app.use('/bluepot',BluePotRoute);
app.use('/dormitory',DormitoryRoute);
app.use('/gaonnuri',GaonNuriRoute);
app.use('/gardencook',GardenCookRoute);
app.use('/groot',GrootRoute);
app.use('/namsan',NamSanRoute);
app.use('/pandorothy',PandorothyRoute);
app.use('/sangrokone',SangRokOneRoute);
app.use('/comment', commentRoute); 
app.use('/api',loginRoute);
app.use('/order',orderRoute);
app.use('/payment',paymentRoute);
app.use('/openID',openIDRoute);

//routes
app.get('/', (req,res) => {
    res.send("사랑해요 동급식!");
});

//connect to db
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(
    //process.env.DB_CONNECTION,
    'mongodb+srv://yehyun:dongguk@donggeubsik.fscyw.mongodb.net/DongGeubSik?retryWrites=true&w=majority',
    {useNewUrlParser: true},
    () => {
    console.log('connected to db')
})

app.listen(port);   //port 추후에 바꿔져야함