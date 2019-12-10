import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import Access from '../entity/access.entity';
import { AccessService } from './access.service';

@Crud({
    model: {
        type: Access,
    },
})
@Controller('access')
export class AccessController implements CrudController<Access> {
    constructor(public service: AccessService) { }
}
