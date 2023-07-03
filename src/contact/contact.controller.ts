import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact, Prisma } from '@prisma/client';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(
    @Body()
    {
      clientId,
      ...contactData
    }: Prisma.ContactCreateInput & { clientId: number },
  ): Promise<Contact> {
    return this.contactService.createContact(contactData, clientId);
  }

  @Get()
  findAll(): Promise<Contact[]> {
    return this.contactService.getAllContacts();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactService.getOneContact(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Prisma.ContactUpdateInput,
  ): Promise<Contact> {
    return this.contactService.updateContact({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Contact> {
    return this.contactService.deleteContact({ id: Number(id) });
  }
}
