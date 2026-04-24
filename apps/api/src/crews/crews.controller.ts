import { Controller, Get, Query } from '@nestjs/common';
import { CrewsService } from './crews.service';

@Controller('crews')
export class CrewsController {
  constructor(private readonly crews: CrewsService) {}

  @Get()
  list() {
    return this.crews.list();
  }

  @Get('name-available')
  nameAvailable(@Query('name') name: string) {
    return this.crews.checkNameAvailable(name);
  }
}
