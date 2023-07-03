// client.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client, Prisma, Contact } from '@prisma/client';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

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
}
