import { Body, Controller, Get, Param, Post, Query, Version } from '@nestjs/common';
import { GetTransactionsDto, TransactDto } from './transaction.dto';
import { Transaction } from './transaction.schema';
import { TransactionService } from './transaction.service';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get('/:walletId')
    @Version("1")
    @ApiParam({ name: 'walletId', description: 'ID of the wallet', type: String })
    @ApiQuery({ name: 'skip', description: 'Number of items to skip', required: false, type: Number })
    @ApiQuery({ name: 'limit', description: 'Number of items to retrieve', required: false, type: Number })
    async getTransactions(
      @Param() getTransactionsDto: GetTransactionsDto
    ): Promise<Transaction[]> {
      const { walletId, skip, limit } = getTransactionsDto;
      return this.transactionService.getTransactions(walletId, skip, limit);
    }

    @Post('/transact/:walletId')
    @Version("1")
    @ApiParam({ name: 'walletId', description: 'ID of the wallet', type: String })
    @ApiBody({ type: TransactDto, description: 'Transaction details' })
    async transact(@Param('walletId') walletId: string, @Body() transactDto: TransactDto): Promise<Transaction> {
      const { amount, description, type } = transactDto;
      return this.transactionService.transact(walletId, amount, description, type);
    }
  
}
