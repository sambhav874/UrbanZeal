import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req) {
  try {
    const data = await req.formData();

    if (data.has('file')) {
      const file = data.get('file');

      const s3Client = new S3Client({
        region: 'ap-south-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });

      const ext = file.name.split('.').slice(-1)[0];
      const newFileName = uniqid() + '.' + ext;

      const chunks = [];
      for await (const chunk of file.stream()) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      const bucket = "urbanzeal";

      const params = {
        Bucket: bucket,
        Key: newFileName,
        ACL: 'public-read', // Consider using private ACL by default unless explicitly needed
        ContentType: file.type,
        Body: buffer,
      };

      await s3Client.send(new PutObjectCommand(params));

      const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`;
      console.log(`Uploaded image: ${link}`);

      return Response.json({ link }); // Return the link and handle errors gracefully
    }

    return Response.json({ message: 'No file uploaded' });
  } catch (error) {
    console.error('Error uploading image:', error);
    return Response.json({ error: 'Failed to upload image' }, 500); // Provide informative error message
  }
}
