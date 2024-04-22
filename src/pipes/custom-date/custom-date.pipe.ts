import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomDatePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const date = new Date(value);

    if (typeof value !== 'string') {
      throw new BadRequestException('Input must be a string');
    }

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return date;
  }
}
