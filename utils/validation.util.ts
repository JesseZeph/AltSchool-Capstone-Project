import { BadRequestException } from '@nestjs/common';

export class ValidationUtil {
  public static validateRequiredFields(
    dto: Record<string, any>,
    requiredFields: string[],
    entityName: string,
  ): void {
    const missingFields = requiredFields.filter((field) => !dto[field]);

    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Missing required fields for ${entityName}: ${missingFields.join(',')}`,
      );
    }
  }
}
