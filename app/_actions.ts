"use server";

import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

// Create r2 client from S3Client Object
const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
    }
})

export const generatePresignedUrl = async (fileName: string, contentType: string) => {
    // Generate fileKey to serve as unique identifer for file
    const fileKey = `${Date.now()}-${fileName}`

    // Put object command to specify the bucket to upload to
    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME as string,
        Key: fileKey,
        ContentType: contentType,
    })

    // generate signed url
    const signedUrl = getSignedUrl(r2, command, {expiresIn: 3600})

    return {
        signedUrl
    }
}