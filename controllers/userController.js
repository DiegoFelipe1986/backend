import User from '../models/User.js';
import generateId from '../helpers/generateId.js';
import generateJWT from '../helpers/generateJWT.js';

const register = async (req, res) => {
    // Non duplicated records
    const { email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
        const error = new Error('User already registered');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        const userSaved = await user.save();
        res.json(userSaved)
    } catch (error) {
        console.log(error)
    }
};

const auth = async (req, res) => {

    const { email, password } = req.body;
    // Check if user exist
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("User not found");
        return res.status(404).json({ msg: error.message })
    }
    // Check if user is comfirm
    if (!user.confirmed) {
        const error = new Error("User not corfirmed");
        return res.status(403).json({ msg: error.message });
    }
    // Check the password
    if (await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        });
    } else {
        const error = new Error("Password wrong");
        return res.status(403).json({ msg: error.message })
    }
};

const confirm = async (req, res) => {
    const { token } = req.params
    const userConfirmed = await User.findOne({ token });
    if (!userConfirmed) {
        const error = new Error("Token not valid");
        return res.status(403).json({ msg: error.message })
    }

    try {
        userConfirmed.confirmed = true;
        userConfirmed.token = '';
        await userConfirmed.save();
        res.json({ msg: "User confirmed" });
    } catch (error) {
        console.log(error)
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("User not found");
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.token = generateId();
        await user.save();
        res.json({ msg: "we sent an email with instructions" })
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params;

    const tokenValid = await User.findOne({ token });

    if (tokenValid) {
        res.json({ msg: "Valid token" })
    } else {
        const error = new Error("Token not valid");
        return res.status(404).json({ msg: error.message })
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ token });

    if (user) {
        user.password = password;
        user.token = '';
        try {
            user.save();
            res.json({ msg: "Password modified succesfuly" })
        } catch (error) {
            console.log(error);
        }

    } else {
        const error = new Error("Token not valid");
        return res.status(404).json({ msg: error.message });
    }
}

const profile = async(req, res) => {
    console.log('from profile...')
}

export { register, auth, confirm, forgotPassword, checkToken, newPassword, profile }