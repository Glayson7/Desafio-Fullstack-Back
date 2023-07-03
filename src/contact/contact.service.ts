import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Contact, Prisma } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(
    data: Prisma.ContactCreateInput,
    clientId: number,
  ): Promise<Contact> {
    return this.prisma.contact.create({
      data: {
        ...data,
        client: {
          connect: {
            id: clientId,
          },
        },
      },
    });
  }

  async getAllContacts(): Promise<Contact[]> {
    return this.prisma.contact.findMany();
  }

  async getOneContact(contactId: number): Promise<Contact> {
    return this.prisma.contact.findUnique({
      where: {
        id: contactId,
      },
    });
  }

  async updateContact(params: {
    where: Prisma.ContactWhereUniqueInput;
    data: Prisma.ContactUpdateInput;
  }): Promise<Contact> {
    const { where, data } = params;
    return this.prisma.contact.update({
      data,
      where,
    });
  }

  async deleteContact(where: Prisma.ContactWhereUniqueInput): Promise<Contact> {
    return this.prisma.contact.delete({
      where,
    });
  }
}
