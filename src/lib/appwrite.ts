// src/lib/appwrite.ts
import { Client, Databases, Account, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
  .setProject('66a575db0020f0cdfe23'); // Your project ID

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account, ID };
