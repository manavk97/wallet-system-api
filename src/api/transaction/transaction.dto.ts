import { IsString, IsNumber, Min, IsOptional, IsNotEmpty, NotEquals, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TRANSACTION_TYPE } from './transaction.constants';
export class GetTransactionsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'exampleWalletId', description: 'ID of the wallet' })
  walletId: string;

  
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 0, description: 'Number of items to skip' })
  skip: number = 0;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 100, description: 'Number of items to retrieve' })
  limit: number = 100;
}

export class TransactDto {
  @ApiProperty({ example: 10, description: 'Transaction amount' })
  @IsNumber()
  @IsNotEmpty()
  @NotEquals(0)
  amount: number;

  @ApiProperty({ example: "CREDIT", enum: TRANSACTION_TYPE,  description: 'Transaction amount' })
  @IsEnum(TRANSACTION_TYPE)
  @IsNotEmpty()
  type: TRANSACTION_TYPE;

  @ApiProperty({ example: 'Example description', description: 'Transaction description' })
  @IsString()
  @IsOptional()
  description: string;
}
