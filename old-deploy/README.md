# Using NGINX

This was the setup I had planned in mind before I realized that Heroku didn't support docker-compose.
NGINX was suppose to serve my frontend bundle while doing a reverse proxy to my backend API.

I would use this setup if I wasn't deploying to Heroku or if I could figure out to use the `heroku.yml` file properly.
I'd also would have to make some changes so that Express server is hosting the React bundle.
