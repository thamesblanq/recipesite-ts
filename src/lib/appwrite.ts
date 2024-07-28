import { Client, Databases, Account} from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66a575db0020f0cdfe23');

const databases = new Databases(client);
const account = new Account(client)

export { client, databases, account };


