const express=require('express');
const connectDB = require('./config/db');
const app=express();
connectDB();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//io.on('connection', function(socket){
//
//    socket.on('newRideAdded', function(exclude){
//      io.emit('newRideAdded', exclude);
//    });
//  
//    console.log('a user connected');
//    socket.on('disconnect', function(){
//      console.log('user disconnected');
//    });
  
//});

app.set('socketio', io);

app.use(express.json({ extended: true }));

app.get('/',(req,res)=> res.send('API running'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/search', require('./routes/api/search'));
app.use('/api/recommend', require('./routes/api/recommend'));
app.use('/api/tag', require('./routes/api/tag'));

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));