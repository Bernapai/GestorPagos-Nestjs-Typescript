import { Module } from '@nestjs/common';
import { InvoiceIntegrationModule } from './invoice-integration/invoice.module';
import { PaymentIntegrationModule } from './payment-integration/payment.module';
import { UserIntegrationModule } from './user-integration/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    InvoiceIntegrationModule,
    PaymentIntegrationModule,
    UserIntegrationModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule { }