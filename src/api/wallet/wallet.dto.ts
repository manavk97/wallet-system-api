import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetupWalletDto {
  @ApiProperty({ example: 100, description: 'Initial balance of the wallet' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  balance: number;

  @ApiProperty({ example: 'MyWallet', description: 'Name of the wallet' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class GetWalletDto {
  @ApiProperty({ example: '12345', description: 'ID of the wallet' })
  @IsString()
  @IsNotEmpty()
  id: string;
}