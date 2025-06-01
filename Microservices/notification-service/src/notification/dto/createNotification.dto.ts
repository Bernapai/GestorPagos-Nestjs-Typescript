import { IsString, IsPhoneNumber } from 'class-validator';

export class SendSmsDto {
  @IsPhoneNumber(undefined)
  to: string;

  @IsString()
  message: string;
}
