import dotenv from 'dotenv'
import path from "path"
import fs from "fs"
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
dotenv.config()
const accountName = process.env.STORAGE_ACCOUNT
const accountKey = process.env.STORAGE_SHARED_KEY
const container = process.env.CONTAINER

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

const BUFFER = path.resolve(__dirname + "/../storage/buffer")
const containerClient = blobServiceClient.getContainerClient(container);
export async function uploadFileToBlob(fileName, filePath) {
    try {

        const blobClient = containerClient.getBlockBlobClient(fileName);

        const result = await blobClient.uploadFile(filePath);

        console.log("File uploaded successfully:", result.requestId);
    } catch (error) {
        throw error

    }
}
export async function getBlob(blobName) {
    try {
        const blobClient = containerClient.getBlobClient(blobName);
        const bufferPath = path.join(BUFFER, blobName); 
        const downloadResponse = await blobClient.downloadToFile(bufferPath);
       
        console.log(`Blob "${blobName}" downloaded successfully as "${bufferPath}".`);
     
    } catch (error) {
        console.log("Error at getBlob")
        throw error;
    }
}
export async function deleteBlob(blobName) {
    const blobClient = containerClient.getBlobClient(blobName);

    try {
        const deleted = await blobClient.deleteIfExists();
        if (deleted) {
            console.log(`Blob "${blobName}" deleted successfully.`);
        } else {
            console.log(`Blob "${blobName}" does not exist.`);
        }
    } catch (error) {
        console.error('Error deleting the blob:', error);
    throw error
    }
}
export function cleanBuffer() {
    fs.readdir(BUFFER, (err, files) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('Directory does not exist or is empty.');
            } else {
                console.error('Error reading directory:', err);
            }
            return;
        }

        if (files.length === 0) {
            console.log('Directory is empty.');
            return;
        }

        files.forEach(file => {
            const filePath = path.join(BUFFER, file);
            fs.unlink(filePath, err => {
                if (err) {
                    console.error(`Error deleting ${file}:`, err);
                } else {
                    console.log(`Deleted ${file}`);
                }
            });
        })
    });

}
export async function encodeImage(blobName) {
    let output={}
    await getBlob(blobName)
    const imagePath = path.join(BUFFER, blobName);
    const buffer = fs.readFileSync(imagePath);
    const data =buffer.toString('base64')
    output["data"] = data;

    const extend = blobName.split(".").slice(-1)[0]

    if (extend === "jpg" || extend == "jpeg") {
        output["type"] = "image/jpeg"
    }
    else if (extend === "png") {
      output["type"] = "image/png"

    }
    else {
        throw new Error(` Image file is not valid, expect either png or jpeg/jpg, but got ${docs[i]["fileIden"]}`)
    }

    return output
}