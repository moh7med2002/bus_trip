import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { adminRepositry } from 'src/constants/entityRepositry';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [
    {
      provide: adminRepositry,
      useValue: Admin,
    },
    AdminService,
  ],
  exports: [adminRepositry],
})
export class AdminModule {}
