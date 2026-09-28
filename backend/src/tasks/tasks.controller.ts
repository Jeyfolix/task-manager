import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.tasksService.findAll(request.user.uid);
  }

  @Post()
  create(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateTaskDto,
  ) {
    return this.tasksService.create(request.user.uid, dto);
  }

  @Patch(':id')
  update(
    @Req() request: AuthenticatedRequest,
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(request.user.uid, taskId, dto);
  }

  @Delete(':id')
  remove(
    @Req() request: AuthenticatedRequest,
    @Param('id') taskId: string,
  ) {
    return this.tasksService.remove(request.user.uid, taskId);
  }
}