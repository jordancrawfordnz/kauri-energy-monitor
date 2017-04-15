# Web App
The web-app is an Angular app which connects to the backend using the API.
Grunt is used as a task runner.

## Setting up local development environment
1. Install NodeJS.
2. Install Ruby.
3. Install npm dependencies with ``npm install``.
4. Install Bower and Grunt with ``npm install bower grunt -g``.
5. Install Bower dependencies with ``bower install``.
6. Install Compass with ``gem install compass``.

You can now run the web-app as detailed below.

## Running
### Local API
``grunt serveLocal`` (or ``grunt serve``).

### Production API
``grunt serveProduction``

## Building
### Local API
``grunt buildLocal``

### Production API
``grunt buildProduction``

### NGINX configuration
The following NGINX configuration is required so all unknown requests get forwarded to the application (as it is a single page web-app).

```
try_files $uri /index.html;
```

## Template
The base template is called [AdminLTE](https://almsaeedstudio.com/preview).
