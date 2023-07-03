import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [ClientModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
