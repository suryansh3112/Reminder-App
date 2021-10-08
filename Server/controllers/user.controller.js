const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//------------------------------------------------------REGISTER------------------------------------------------------
const register = async (req, res) => {
  try {
    let { email, password, confirmPassword, firstName, lastName } = req.body;

    //===========================Validation===========================

    if (!email || !password || !confirmPassword || !firstName || !lastName)
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail)
      return res
        .status(400)
        .json({ message: 'An account with this email already exists.' });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: 'The password needs to be atleast 6 characters.' });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: 'Please enter the same password twice' });

    //========================SAVING-USER=======================================

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: firstName + ' ' + lastName,
      email,
      password: passwordHash
    });
    const savedUser = await newUser.save();
    res.status(200).json({ message: 'Successfully Registered' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----------------------------------------------------------LOGIN-----------------------------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });

    //Checking for registered email or username and assigning it to "user

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: 'No account with this email is registered.'
      });
    }

    //Checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid Credentials' });

    //Assigning Json Web Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // , {expiresIn: '3h'}
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//-----------------------------------------------TOKEN-IS-VALID---------------------------------------------------------
const tokenIsValid = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    return res.json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------------------------------------------------GET-LOGGED-IN-USER------------------------------------------------
const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const seedUsers = async (req, res) => {
  try {
    const fn = [
      'Suryansh',
      'Rahul',
      'Sahil',
      'Liam',
      'Olivia',
      'Noah',
      'Emma',
      'Oliver',
      'Ava',
      'William',
      'Sophia',
      'Elijah',
      'Isabella',
      'James',
      'Charlotte'
    ];
    const ln = [
      'Purohit',
      'Shinde',
      'Jain',
      'Anderson',
      'Ashwoon',
      'Aikin',
      'Bateman',
      'Bongard',
      'Bowers',
      'Boyd',
      'Cannon',
      'Cast',
      'Deitz',
      'Dewalt',
      'Ebner'
    ];
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash('test123', salt);
    for (let i = 0; i < fn.length; i++) {
      const newUser = new User({
        name: fn[i] + ' ' + ln[i],
        email: `${fn[i].toLowerCase()}@gmail.com`,
        password: passwordHash
      });
      const savedUser = await newUser.save();
    }

    res.status(200).json({ message: 'Successfully Seeded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.user } },
      { name: 1, email: 1 }
    );
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------------------------------------------------EXPORTS-----------------------------------------------------------
exports.register = register;
exports.login = login;
exports.tokenIsValid = tokenIsValid;
exports.getLoggedInUser = getLoggedInUser;
exports.seedUsers = seedUsers;
exports.getAllUsers = getAllUsers;
