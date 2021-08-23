
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`REDIS_URL`

`PORT`

`SECRET`

`CORS_ORIGIN`

`S3_BUCKET_NAME`

`CLOUDFRONT_API_ENDPOINT`

`CF_DOMAIN_NAME`

`STRIPE_API_KEY`

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`
## Features

- Geolocation Search
- Dataloaders to solve n+1 problem
- Subscriptions with redis
- Cookies

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/SebastianDarie/airbnb-clone.git
```

Go to the project directory

```bash
  cd airbnb-clone/packages/server
```

Install dependencies

```bash
  yarn
```

Build the server

```bash
  yarn build
```

Start the server

```bash
  yarn dev
```

  
