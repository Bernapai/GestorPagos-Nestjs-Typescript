import { IsString, IsPhoneNumber } from 'class-validator';

export class SendSmsDto {
  @IsPhoneNumber(undefined) // acepta cualquier país (podés usar 'AR' o 'US' si querés limitar)
  to: string;

  @IsString()
  message: string;
}
