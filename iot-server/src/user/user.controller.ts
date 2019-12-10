import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import User from '../entity/user.entity';
import { UserService } from './user.service';

@Crud({
    model: {
        type: User,
    },
})
@Controller('user')
export class UserController implements CrudController<User> {
    constructor(public service: UserService) { }
}
