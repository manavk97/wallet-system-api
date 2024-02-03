import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { Wallet, WalletDocument } from '../wallet/wallet.schema';
import { TRANSACTION_TYPE } from './transaction.constants';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private readonly logger: PinoLogger
  ) {
    logger.setContext(TransactionService.name);
   }

  async transact(walletId: string, amount: number, description: string, type: TRANSACTION_TYPE): Promise<Transaction> {
    const session = await this.walletModel.startSession();
    session.startTransaction();

    try {
      const wallet = await this.walletModel.findById(walletId).session(session).exec();

      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }

      amount = (type == TRANSACTION_TYPE.CREDIT ? Math.abs(amount) : -Math.abs(amount));

      const balance = (wallet.balance + amount)
      console.log(balance, amount, wallet.balance, walletId);
      const transaction = new this.transactionModel({ 
        walletId,
        amount,
        balance,
        description,
        type,
      });
      
      await transaction.save({ session });

      const result = await this.walletModel.findByIdAndUpdate(walletId, { $inc: { balance : amount } }, { session }).exec();
      console.log(result);
      await session.commitTransaction();
      return transaction;
    } catch (error) {
      await session.abortTransaction();
      this.logger.error(error);
      // Handle any errors that may occur during the transaction process
      throw error;
    } finally {
      session.endSession();
      // add log
    }
  }

  async getTransactions(walletId: string, skip: number, limit: number): Promise<Transaction[]> {
    return this.transactionModel
      .find({ walletId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
}
