import {application, Router} from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateAppointmentService from '../services/CreateAppointmentService';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';


const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

      const{ name, email, password } = request.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
        name,
        email,
        password,
      });
      // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
      delete user.password;

      return response.json(user);



});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) =>{

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename,
    });

    // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
    delete user.password;

    return response.json(user);


});

export default usersRouter;
