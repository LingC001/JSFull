import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecordDocument = Record & Document;

@Schema()
export class Record {
  //计算结果
  @Prop()
  calValue: number;
  //创建时间
  @Prop()
  createTime: number;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
