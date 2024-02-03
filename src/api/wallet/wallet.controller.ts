import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { SetupWalletDto, GetWalletDto } from './wallet.dto';
import { Wallet } from './wallet.schema';
import { WalletService } from './wallet.service';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Post('setup')
    @Version("1")
    @ApiBody({ type: SetupWalletDto, description: 'Setup a new wallet' })
    async setupWallet(@Body() setupWalletDto: SetupWalletDto): Promise<Wallet> {
      const { balance, name } = setupWalletDto;
      return this.walletService.createWallet(balance, name);
    }
  
    @Get(':id')
    @Version("1")
    @ApiParam({ name: 'id', description: 'ID of the wallet', type: String })
    async getWallet(@Param() getWalletDto: GetWalletDto): Promise<Wallet> {
      return this.walletService.getWalletById(getWalletDto.id);
    }
}

