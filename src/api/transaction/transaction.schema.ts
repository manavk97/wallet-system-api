// wallet/schemas/transaction.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TRANSACTION_TYPE } from './transaction.constants';

export type TransactionDocument = Transaction & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
    }
  }
})
export class Transaction {
  @Prop({ required: true })
  walletId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  balance: number;

  @Prop({ required: false, default: "" })
  description: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ enum: TRANSACTION_TYPE, required: true })
  type: string;
}

const TransactionSchema = SchemaFactory.createForClass(Transaction)
TransactionSchema.index({ walletId: 1, date: -1 });

export { TransactionSchema };
