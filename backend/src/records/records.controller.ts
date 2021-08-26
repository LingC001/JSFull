import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './schemas/record.schema';

@Controller('records')
export class RecordsController {
  constructor(private readonly RecordsService: RecordsService) {}

  @Post()
  public async createRecord(
    @Res() res,
    @Body() CreateRecordDto: CreateRecordDto
  ) {
    try{
      const records =  await this.RecordsService.create(CreateRecordDto);
      return res.status(HttpStatus.OK).json({
        message: 'Records has been created successfully',
        records
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Records not created!',
        status: 400,
      });
    }
  }

  @Get()
  public async findAll(
    @Res() res,
  ): Promise<Record[]> {
    const records = await this.RecordsService.findAll()
    return res.status(HttpStatus.OK).json(records);
  }
}
