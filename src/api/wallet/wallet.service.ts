import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './wallet.schema';

@Injectable()
export class WalletService {

    constructor(
        @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
      ) {}
    
      async createWallet(balance: number, name: string): Promise<Wallet> {
        const wallet = new this.walletModel({ balance, name });
        return wallet.save();
      }
    
      async getWalletById(walletId: string): Promise<Wallet> {
        const wallet = await this.walletModel.findById(walletId);
        if (!wallet) {
          throw new NotFoundException('Wallet not found');
        }
        return wallet.toJSON();
      }
}
