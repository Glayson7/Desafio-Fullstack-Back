import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Client, Contact } from '@prisma/client';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfService {
  createPdf(clientWithContacts: Client & { contacts: Contact[] }) {
    const docDefinition: any = {
      content: [
        { text: 'Client Report', style: 'header' },
        { text: `Client ID: ${clientWithContacts.id}`, style: 'subheader' },
        { text: `Client Name: ${clientWithContacts.name}`, style: 'subheader' },
        { text: 'Contacts:', style: 'subheader' },
        ...clientWithContacts.contacts.map((contact) => {
          return {
            text: `Contact ID: ${contact.id}, Contact Name: ${contact.name}`,
          };
        }),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    return pdfDoc;
  }
}
