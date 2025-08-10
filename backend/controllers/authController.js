import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import transporter from "../config/nodemailer.js";


export const register = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
        return res.json({ success: false, message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to VirDev',
            text: `Hi ${firstname},\n\nWelcome to VirDev! Your account has been successfully created.\nVerify yourself by clicking the verify botton on the site.\n\nBest regards,\nVirDev Team`,
        }

        await transporter.sendMail(mailOptions);


        return res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and Password are required' });
    }

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: 'User logged in successfully' });

    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const logout = async (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: 'User logged out successfully' });
    }
    catch (error) {
        return res.json({ success: false, message: error.message });

    }
}

//send verification email to verify user with otp
export const sendVerificationOtp = async (req, res) => {
    const { email } = req.body;

    try {

        const { userId } = req.body;

        const user = await User.findById(userId);

        if (user.isUserVerified) {
            return res.json({ success: false, message: 'Account already verified' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verification OTP',
            text: `Hi,\n\nYour verification OTP is: ${otp}\n\nPlease use this OTP to verify your account.\n\nBest regards,\nVirDev Team`,
        }

        transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Verification OTP sent to your email' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}


export const veryfyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        user.isUserVerified = true;
        user.verifyOtp = '';
        user.isUserVerifiedAt = 0;

        await user.save();

        return res.json({ success: true, message: 'User verified successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const isUserAuthenticated = (req, res) => {
    try {
        res.json({ success: true, message: 'User is authenticated' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}


export const sendResetPasswordEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset Password',
            text: `Hi,\n\nYour reset password OTP is: ${otp}\n\nPlease use this OTP to reset your password.\n\nBest regards,\nVirDev Team`,
        };

        transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Reset password email sent to your email' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Password reset successfully' });
    }
        
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

