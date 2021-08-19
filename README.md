
# Airbnb Clone

As the name implies the app integrates Airbnb's core functionality like browsing listings based on location or map movement, reservations with payments and refunds, category-based ratings with reviews, messaging between hosts and guests. 


## Demo

https://mernlabs.team

  
## Deployment

To deploy this project run\
This assumes you have the Vercel CLI installed

```bash
  cd packages/client
  vercel --prod
```
And just follow the instructions to set up a new project

For the server this assumes you have Docker installed and maybe have a debit/credit card around
```bash
  cd packages/server
  npm run build
```
Then edit the `deploy.sh` file and change **sebastian2772** with your Docker Hub username as well as **airbnb-clone** with your Docker repository name
Make sure you are in the server directory, now run `sudo ./deploy.sh`.
You may need to chmod the file.

Get yourself a VPS from either DigitalOcean, AWS, Google Cloud, Azure\
Install Dokku on it follow [https://dokku.com/docs/getting-started/installation/](https://dokku.com/docs/getting-started/installation/) for reference\
Install the Dokku PostgreSQL and Redis add-ons you can find them on GitHub  
Then create a database, cache, app, link them together

After you are done with those run the following
```bash
  dokku git:from-image api sebastian2772/airbnb-clone:$VERSION
```
Replace api with your app name as well as the docker repo and add the version at the end.
## Features

- Search functionality with Places API
- Radius and bounds geolocation
- Stripe payments and refunds
- Real time messaging
- Multi category reviews

  
## Run Locally

For the server you need the `.env` and a Postgres db plus Redis server running
For the frontend you need a `.env.local` file

Clone the project

```bash
  git clone https://github.com/SebastianDarie/airbnb-clone.git
```

Go to the project directory

```bash
  cd airbnb-clone
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  cd packages/server
  yarn build
  yarn dev
```

Start the frontend

```bash
  cd packages/client
  yarn dev
```
## Screenshots

![Home Page](https://ik.imagekit.io/1nlnne3ilbe/airbnb-clone_SrLrKhNiNE.png?updatedAt=1629312825686&tr=w-1200,h-575)\
![Create Listing Page](https://ik.imagekit.io/1nlnne3ilbe/airbnb-clone-create_W4dS551s3.png?updatedAt=1629312824154&tr=w-1200,h-575)\
![Room Page](https://ik.imagekit.io/1nlnne3ilbe/airbnb-clone-room_ZlV2lXg1m.png?updatedAt=1629312824365&tr=w-1000,h-575)
  
