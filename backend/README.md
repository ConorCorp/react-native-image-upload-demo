# backend
A stupid simple server that uses Bun's native http server.

## Setup
1. Install the [bun runtime](https://bun.sh/).
2. Set up your AWS bucket, see below.
3. Create your env file:
```bash
cp .env.example .env
# Fill in your .env
```
4. Run your server:
```bash
bun dev
```
5. The terminal should say: `Listening on http://localhost:3000`

## Deployment
This probably isn't the most idea product server, though it is capable. If you do use it in production make sure to update the user authentication on the endpoints and put a more capable web server in front of this like nginx.

## AWS Bucket Setup
**WARNING: This bucket configuration should not be used in production, only for demos. The images in this bucket can be viewed by any public person.**

In the bucket's permissions page:
1. Set `Block all public access` to `off`.
2. Update the `Bucket Policy` to allow viewing all objects:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::modergator-demo-apps/*"
        }
    ]
}
```
1. Only for web apps: Update the `Cross-origin resource sharing (CORS)` policy:
```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "HEAD",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ]
    }
]
```