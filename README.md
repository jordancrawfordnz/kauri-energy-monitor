# Kauri Energy Monitor

## What is this?
<!-- Overview why and what this is -->

<!-- Some screenshots -->

<!-- How the app is split up into frontend, bridge, API, etc. -->

## Usage

### Setting up the environment
1. Clone this repository to your system.
2. [Install NodeJS](https://nodejs.org/en/download/) on your system. This comes with `npm`, the Node package manager.
3. [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) This is required for Compass. You may already have this - macOS comes with Ruby.
4. [Install and start MongoDB](https://docs.mongodb.com/manual/installation/) on your system. On macOS, [installation with Homebrew](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-with-homebrew) is recommended.
5. Run `gem install compass`. If you get errors on Ubuntu, [try this](http://stackoverflow.com/a/29317694).
6. Run `npm install -g pm2 nodemon bower grunt`. This installs several required npm packages globally on your system.
7. Run `npm run setup` to setup dependencies for the API.
8. Run `npm --prefix frontend run setup` to setup dependencies for the frontend.

### Running in Development
When running in development, it's easiest to run the frontend and API separately.

1. Run `nodemon`.
2. Open another terminal window.
3. Run `grunt --base frontend --gruntfile frontend/Gruntfile.js serve`

#### Default Development Stack

**Frontend**
- Port: 9000
- By default this uses the API prefix `http://localhost:3000/api`.
- The page will refresh when changes are made.

[See the frontend README for more details about running the frontend in development mode.](/frontend#readme)

**API**
- Port: 3000
- Expects MongoDB to be available on `localhost`.
- Uses [nodemon](https://github.com/remy/nodemon) to restart automatically when a change is made (excluding changes to the frontend, exports, etc.).
- Uses configuration in `nodemon.json`.
- Has access to the StrongLoop API Explorer at `http://localhost:3000/explorer`.

### Running in Production
In production the API's server is used to host the frontend. The frontend must first be built as a set of static files.

The recommended way to run the server in production is through PM2, as if the server crashes, PM2 will restart it.

1. Build the frontend with `grunt --base frontend --gruntfile frontend/Gruntfile.js build`. This builds to the `frontend/dist` directory and by default uses the API prefix `/api`.
2. Run `pm2 start pm2.json`.
3. Use `pm2 info Kauri` for status information or see the [PM2 documentation](http://pm2.keymetrics.io/) for more information.

By default, the server will run at port 3000. Running an [NGINX proxy which provides connectivity via HTTPS](https://www.nginx.com/resources/admin-guide/nginx-https-upstreams/) is recommended. [LetsEncrypt](https://letsencrypt.org/) allows you to obtain a free SSL certificate for this purpose.

#### About running in production
[See the frontend README for more details about building the frontend.](/frontend#readme)

`pm2.json` sets `NODE_ENV` to `production`. In production, the StrongLoop API Explorer is disabled and stack traces are not shown in errors.

If you wish to change settings like the database hostname or the server port, define a custom `server/datasources.production.json` or `server/config.production.json` file as per [Loopback's environment specific configuration documentation](https://loopback.io/doc/en/lb2/Environment-specific-configuration.html).

## API Documentation
When you have an instance of the API running you can access the StrongLoop API Explorer at `http://localhost:3000/explorer` to experiment with the API.

## Contributing
I am not actively developing this project but if you find a bug or anything that could make the system better, please raise an issue on GitHub.

Even better, if you have a chance, feel free to fork the repository, make your change and open a merge request to have it merged in.

## Licence
<!-- TODO: Decide on this. -->
