import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../user/schemas/role.enum';

export const Roles_Key = 'Roles_Key';
export const Roles = (...Role: RoleEnum[]) => SetMetadata(Roles_Key, Role);
