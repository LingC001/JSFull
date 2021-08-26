import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRecordDto } from "./dto/create-record.dto";
import { Record, RecordDocument } from "./schemas/record.schema";

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private readonly recordModel: Model<RecordDocument>,
  ) {}

  async create(CreateRecordsDto: CreateRecordDto): Promise<Record> {
    CreateRecordsDto.createTime = Date.now()
    const createdRecord = new this.recordModel(CreateRecordsDto);
    return createdRecord.save();
  }

  async findAll(): Promise<Record[]> {
    return this.recordModel.find().exec();
  }
}
