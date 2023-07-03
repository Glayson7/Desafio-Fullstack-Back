import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Verifique o caminho correto para o PrismaService
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  providers: [PrismaService, ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
