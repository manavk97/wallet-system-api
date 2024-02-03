// wallet/schemas/wallet.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
    }
  }
})
export class Wallet {
  @Prop({ required: true })
  balance: number;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  date: Date;
}

const WalletSchema = SchemaFactory.createForClass(Wallet)
export { WalletSchema };
