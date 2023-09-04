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


// get unique user using find 

// use find when you want to find any stuff(can be many) returns and array

// findOne when you want to look for a particular stuff returns and object


app.get('/user/:username', async (req,res) => {

  
   
  //return res.json(req.params['id']);

  try{

    const unique = req.query.username;

    const uniqueUser = await User.findOne({username:req.params['username']}, 'username email password phone');

    
    if (!uniqueUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data back as a response
    return res.json(uniqueUser);

  }

  catch(error){
    return res.status(500).json("An error occurred");
  }

})


// get user by ID


app.get('/user/find/:id',  async (req, res) => {

  try{

    const input = req.params.id;

    const user = await User.findById(input, 'username email password phone');

    if(!user){
      return res.status(404).json({message:"User not found"});

    }

    return res.json(user)

  }

  catch(error){
    return res.status(500).json({messageb : 'Internal server error'});
  }
})





app.listen(5000, () => {
    console.log('nodemon server is running on port 5000')
})