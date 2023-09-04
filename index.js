const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(cors())

const User = require('./models/userModel')


const dbUrl = 'mongodb+srv://edifice123:BOBson246@firstcluster.ommlbaz.mongodb.net/firstcluster';

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  })
  .then(() => {
    console.log('Connected to MongoDB');

    // Your code here: define and use Mongoose models, perform database operations, etc.
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Bob' },
  ];


// get users


app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username email password phone'); // Specify the fields you want to include

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// getuse

// create new user

app.post('/user/create',(req,res) => {

   const { username, email, password, phone } = req.query;

  //  console.log(res.json(username));

  // // Create a new user instance
  const newUser = new User({
  //   username: 'john_doe',
  // email: 'john@example.com',
  // password: 'securepassword',
  // phone: '123-456-7890',

  username, email, password, phone
  });

   // Save the new user to the database
   newUser.save()
   .then(() => {
     res.status(201).json(newUser);
   })
   .catch((error) => {
     res.status(500).json({ error: error.message });
   });




})


// get unique user


app.get('/user/:id', async (req,res) => {

  try{

    const unique = req.params.id;

    const uniqueUser = await User.find({id}, 'username email password phone');

    return res.json(uniqueUser);

  }

  catch(error){
    return res.status(500).json("An error occurred");
  }

})





app.listen(5000, () => {
    console.log('nodemon server is running on port 5000')
})