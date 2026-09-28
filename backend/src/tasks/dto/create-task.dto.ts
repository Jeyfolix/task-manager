import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'notPastDate', async: false })
class NotPastDateConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!value) {
      return true;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(`${value}T00:00:00`);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= today;
  }

  defaultMessage(): string {
    return 'Due date cannot be in the past.';
  }
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @IsDateString()
  @IsOptional()
  @Validate(NotPastDateConstraint)
  dueDate?: string;
}