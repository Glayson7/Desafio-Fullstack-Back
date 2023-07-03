import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PdfService } from '../pdf.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService, PdfService],
})
export class ClientModule {}
