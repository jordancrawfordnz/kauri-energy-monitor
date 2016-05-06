# Web App
The web-app is an Angular app which connects to the backend using the API.
Grunt is used as a task runner.

## Setting up local development environment
### NPM
Setup npm then run ``npm install``.


### Bower
Setup Bower (via npm), then run ``bower install``.

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

TODO:

## Template
The base template is called [AdminLTE](https://almsaeedstudio.com/preview).