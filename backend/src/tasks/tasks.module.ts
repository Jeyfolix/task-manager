import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [AuthModule, FirebaseModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}