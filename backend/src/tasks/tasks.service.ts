import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FieldValue } from 'firebase-admin/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class TasksService {
  private readonly collectionName = 'tasks';

  constructor(private readonly firebaseService: FirebaseService) {}

  private get tasksCollection() {
    return this.firebaseService.getFirestore().collection(this.collectionName);
  }

  async findAll(userId: string): Promise<Task[]> {
    const snapshot = await this.tasksCollection
      .where('userId', '==', userId)
      .get();

    return snapshot.docs
      .map((doc) => this.toTask(doc))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async create(userId: string, dto: CreateTaskDto): Promise<Task> {
    const now = new Date().toISOString();

    const taskData = {
      userId,
      title: dto.title.trim(),
      description: dto.description?.trim() ?? '',
      status: 'pending' as const,
      dueDate: dto.dueDate ?? null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const document = await this.tasksCollection.add(taskData);

    const created = await document.get();

    return this.toTask(created);
  }

  async update(
    userId: string,
    taskId: string,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    const document = await this.tasksCollection.doc(taskId).get();

    if (!document.exists) {
      throw new NotFoundException('Task not found.');
    }

    const existingTask = document.data();

    if (existingTask?.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task.');
    }

    const updates: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (dto.title !== undefined) {
      updates.title = dto.title.trim();
    }

    if (dto.description !== undefined) {
      updates.description = dto.description.trim();
    }

    if (dto.status !== undefined) {
      updates.status = dto.status;
    }

    if (dto.dueDate !== undefined) {
      updates.dueDate = dto.dueDate;
    }

    await this.tasksCollection.doc(taskId).update(updates);

    const updated = await this.tasksCollection.doc(taskId).get();

    return this.toTask(updated);
  }

  async remove(userId: string, taskId: string): Promise<void> {
    const document = await this.tasksCollection.doc(taskId).get();

    if (!document.exists) {
      throw new NotFoundException('Task not found.');
    }

    const existingTask = document.data();

    if (existingTask?.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task.');
    }

    await this.tasksCollection.doc(taskId).delete();
  }

  private toTask(
    document: FirebaseFirestore.DocumentSnapshot,
  ): Task {
    const data = document.data();

    if (!data) {
      throw new NotFoundException('Task data not found.');
    }

    return {
      id: document.id,
      userId: data.userId,
      title: data.title,
      description: data.description ?? '',
      status: data.status ?? 'pending',
      dueDate: data.dueDate ?? null,
      createdAt: this.toISOString(data.createdAt),
      updatedAt: this.toISOString(data.updatedAt),
    };
  }

  private toISOString(value: unknown): string {
    if (
      value &&
      typeof value === 'object' &&
      'toDate' in value &&
      typeof value.toDate === 'function'
    ) {
      return value.toDate().toISOString();
    }

    if (typeof value === 'string') {
      return value;
    }

    return new Date().toISOString();
  }
}