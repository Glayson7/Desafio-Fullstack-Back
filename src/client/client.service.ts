import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Client, Prisma, Contact } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    try {
      return this.prisma.client.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      });
    } catch (error) {
      console.log(error);
      console.error('Erro ao criar o cliente:', error);
    }
  }

  async getAllClients(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  async getOneClient(clientId: number): Promise<Client> {
    return this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
  }

  async updateClient(params: {
    where: Prisma.ClientWhereUniqueInput;
    data: Prisma.ClientUpdateInput;
  }): Promise<Client> {
    const { where, data } = params;
    return this.prisma.client.update({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      where,
    });
  }

  async deleteClient(where: Prisma.ClientWhereUniqueInput): Promise<Client> {
    return this.prisma.client.delete({
      where,
    });
  }

  async addContact(
    clientId: number,
    contactData: Prisma.ContactCreateInput,
  ): Promise<Contact> {
    return this.prisma.contact.create({
      data: {
        ...contactData,
        client: {
          connect: { id: clientId },
        },
      },
    });
  }

  async getClientWithContacts(
    clientId: number,
  ): Promise<Client & { contacts: Contact[] }> {
    return this.prisma.client.findUnique({
      where: { id: clientId },
      include: { contacts: true },
    });
  }
}
