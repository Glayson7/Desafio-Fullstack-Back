import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client, Prisma, Contact } from '@prisma/client';
import { PdfService } from '../pdf.service';
import { Response } from 'express';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  create(@Body() clientData: Prisma.ClientCreateInput): Promise<Client> {
    return this.clientService.createClient(clientData);
  }

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.getOneClient(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Prisma.ClientUpdateInput,
  ): Promise<Client> {
    return this.clientService.updateClient({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Client> {
    return this.clientService.deleteClient({ id: Number(id) });
  }

  @Post(':id/contact')
  async addContact(
    @Param('id') clientId: string,
    @Body() contactData: Prisma.ContactCreateInput,
  ): Promise<Contact> {
    return this.clientService.addContact(Number(clientId), contactData);
  }

  @Get(':id/contacts')
  async getContacts(
    @Param('id') clientId: string,
  ): Promise<Client & { contacts: Contact[] }> {
    return this.clientService.getClientWithContacts(Number(clientId));
  }

  @Get(':id/report')
  async getReport(@Param('id') clientId: string, @Res() response: Response) {
    const clientWithContacts = await this.clientService.getClientWithContacts(
      Number(clientId),
    );

    const report = this.pdfService.createPdf(clientWithContacts);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=client_report.pdf',
    );

    report.pipe(response);
    report.end();
  }
}
