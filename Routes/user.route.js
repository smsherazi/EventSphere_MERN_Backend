import express from 'express';
import { EditUser, Login, Logout, OrganizerApprove, OrganizerRequest, SignUp , getMe, showUsers,getUserById, OrganizerReject  } from '../Controllers/user.controller.js';
import { authVerify } from '../Middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/api/showUsers',authVerify, showUsers);

userRouter.get('/api/organizer-req', authVerify ,OrganizerRequest)

userRouter.put('/api/organizerApprove', authVerify ,OrganizerApprove)

userRouter.put('/api/organizerReject', authVerify ,OrganizerReject);

userRouter.post('/api/signUser', SignUp);

userRouter.post('/api/loginUser', Login);

userRouter.get('/api/me', authVerify, getMe);   

userRouter.post('/api/logout', Logout);

userRouter.put("/api/users/:id", authVerify, EditUser)

userRouter.get("/api/users/:id", authVerify, getUserById);


export default userRouter;  
