# Create and deploy a cloud native web application using the MERN (MongoDB, Express, React, Node.js) stack

This repository has code to create a web app that is pre-configured with the MERN stack (MongoDB, Express.js, React, Node.js). We use IBM Cloud services to host our application; the IBM Cloud Developer Tools CLI to run and debug locally; and lastly provide native commands to deploy to Kubernetes or Cloud Foundry.

By running this code, you'll understand how to:
* Build an application that uses MongoDB, Express.js, React, and Node.js
* Create an application for monitoring and distributed tracing using App Metrics
* Deploy an application using the IBM Cloud Developer Tools CLI or natively with Kubernetes or Cloud Foundry

![](https://github.com/IBM/pattern-utils/raw/master/mern-starter/architecture.png)

## Flow

1. The user views the React web app with a browser.
2. With both components written in Node.js, the React front end communicates with the Express back end via RESTful APIs.
3. The back-end Express application uses the Mongo database for storing and retrieving data.
4. Back-end results are communicated back to the front end.
5. Front-end results are rendered in a human-readable format to the user.

## Included Components

* [IBM Cloud](https://console.bluemix.net/docs/overview/ibm-cloud.html#overview): Provides a computing platform that includes a catalog of cloud services which can be integrated with PaaS and IaaS to build business applications.
* [Kubernetes Cluster](https://console.bluemix.net/docs/containers/container_index.html): Create and manage your cloud infrastructure and use Kubernetes as your container orchestration engine.
* [MongoDB](https://console.bluemix.net/docs/infrastructure/database-tools/mongodb-topic-description.html#mongodb): Fully featured NoSQL server that is horizontally scalable to meet your enterprise-class database service needs.
* [Express](https://expressjs.com/): Most popular and minimalistic web framework for creating API and Web server.
* [React](https://facebook.github.io/react/): JavaScript library for building user interfaces.

## Featured Technologies

* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.
* [Containers](https://www.ibm.com/cloud-computing/bluemix/containers): Virtual software objects that include all the elements that an app needs to run.
* [Cloud native](https://github.com/cncf): Cloud native is an approach to building and running applications that exploit the advantages of the cloud computing delivery model

## Getting Started

Ensure [IBM Cloud Developer Tools](https://github.com/IBM-Cloud/ibm-cloud-developer-tools) are installed. To install on MacOS and Linux, run:

```
curl -sL http://ibm.biz/idt-installer | bash
```

To install on Windows, run as Administrator:

 ```
Set-ExecutionPolicy Unrestricted; iex(New-Object Net.WebClient).DownloadString('http://ibm.biz/idt-win-installer')
```

> *NOTE:* IDT builds and runs the project using Docker containers, the recommended approach for cloud native development. However, direct use of native tools (e.g. npm) is also supported. See the [Appendix](APPENDIX.md) for more information.

## Building your MERN app

The starter project supports the concept of dev mode and release mode.  In dev mode, the starter app runs with dev dependencies installed and hot reload enabled for both the front-end and back-end aspects of the app. Dev mode is intended for use during app development. Release mode excludes dev dependencies and runs the app without hot reload. Release mode is intended for running in production.

#### Working in development mode

1. Build the project with all dependencies, including dev dependencies, with the command:

    ```
    ibmcloud dev build --debug
    ```    

    > *NOTE:* Ensure a Docker daemon is running before issuing the above command

2. Run project unit tests with the command:

    ```
    ibmcloud dev test
    ```

3. Run the app in dev mode with the command:

    ```
    ibmcloud dev shell run-dev &
    ```

    A web server runs on port `3000` and the app itself runs on port `3100`. The web server and app automatically reload if changes are made to the source.

4. Run the app in interactive debug mode with the command:

    ```
    ibmcloud dev debug
    ```

    The app listens on port `5858` for the debug client to attach to it, and on port `3000` for app requests.

#### Working in release mode

1. Build the project:

    ```
    ibmcloud dev build
    ```

    This builds the project using `Dockerfile-tools`. Effectively equivalent to `idt build --debug`.

2. Run the project:

    ```
    ibmcloud dev run
    ```

    This runs the project using the release image built on the fly using `Dockerfile`. Hot reload is not available in the release image.

## Default URLs and sample output

Whether you run in dev mode or release mode, you have the same default URLs available to you:

1. [http://localhost:3000](http://localhost:3000)

   ![](https://github.com/IBM/pattern-utils/raw/master/mern-starter/homepage.png)

2. [http://localhost:3000/appmetrics-dash](http://localhost:3000/appmetrics-dash)

   ![](https://github.com/IBM/pattern-utils/raw/master/mern-starter/appmetrics.png)

3. [http://localhost:3000/health](http://localhost:3000/health)

   ![](https://github.com/IBM/pattern-utils/raw/master/mern-starter/health.png)

## Deploying your MERN app

These projects are designed for deployment to IBM Cloud through the IBM Cloud Developer Tools CLI, to either Kubernetes (public or private cloud) or Cloud Foundry (public cloud only).

Before deploying your MERN app, you will need to sign in to [IBM Cloud](https://console.bluemix.net/docs/cli/reference/ibmcloud/bx_cli.html#ibmcloud_login) via Command Line.

 ```
ibmcloud login
```

> *NOTE*: As mentioned earlier, for deployments on other environments using native commands see [Appendix](APPENDIX.md).

#### As a Cloud Foundry app

To deploy the app to Cloud Foundry:

```
ibmcloud dev deploy
```

#### In a Kubernetes cluster

To deploy the app to Kubernetes:

```
ibmcloud dev deploy --target container
```

An interactive session will begin where you'll be prompted for a new or existing IBM Cloud Kubernetes Service cluster name. Once the cluster is validated and the Docker registry confirmed the app will be deployed to a Kubernetes cluster. _The output below has been trimmed for readability._

```
The IBM cluster name for the deployment of this application will be: stevemar-cluster
Log in to the IBM Container Registry ...
Configuring with cluster 'stevemar-cluster' ...

Deployments:
NAME                     DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
mernexample-deployment   1         1         1            0           3s
mongo-deployment         1         1         1            0           3s

Nodes:
NAME             STATUS    ROLES     AGE       VERSION
10.177.184.198   Ready     <none>    14m       v1.10.5+IKS

Your application is hosted at http://169.47.252.58:32281/
```

## Setting up MongoDB

Now that we have a Dockerized version of our app running, before we push it to production we'll need to configure a managed Mongo database, this is a MERN stack after all!

### Provisioning an instance of MongoDB

*  Create a managed instance of MongoDB by searching for **Compose for MongoDB** in the [Catalog](https://console.bluemix.net/catalog/)
* Once created go to the _Service credentials_ menu and create a new credential.
* Copy the `uri` to a text file, we'll need to parse the content out.
* From the `uri` we will need to extract the `username`, `password`, and `mongo_url`. The text is in the form of `mongodb://{username}:{password}@{mongo_url}`.

![](https://github.com/IBM/pattern-utils/raw/master/compose-dbs/mongo-creds.png)

> *NOTE*: Alternatively, you may install MongoDB natively. Refer to the [install instructions](https://docs.mongodb.com/manual/administration/install-community).

### Configuring MongoDB

Connecting to MongoDB is done in the file [server/routers/mongo.js](server/routers/mongo.js). It is controlled through environment variables. Below is a sample set of credentials.

```bash
export MONGO_URL='portal-ssl1308-22.bmix-dal-yp-c4627161-a212-45bd-b0bd-62004a6e6f5c.421838044.composedb.com:54951'
export MONGO_USER='admin'
export MONGO_PASS='AFLLYADUNVAUKPNO'
export MONGO_DB_NAME='admin'
```

If you want to perform a quick test, try using the [`mongo`](https://docs.mongodb.com/manual/reference/program/mongo/) CLI.

```bash
$ mongo --ssl --sslAllowInvalidCertificates $MONGO_URL -u $MONGO_USER -p $MONGO_PASS --authenticationDatabase $MONGO_DB_NAME
MongoDB shell version v4.0.1
connecting to: mongodb://portal-ssl1308-22.bmix-dal-yp-c4627161-a212-45bd-b0bd-62004a6e6f5c.421838044.composedb.com:54951/test
MongoDB server version: 3.4.10
mongos>
```

#### Using Mongo with Cloud Foundry

Navigate to your application, select the _Runtimes_ menu and you'll be given an opportunity to enter environment variables.

#### Using Mongo with Kubernetes

Open `values.yaml` under the chart directory (e.g. `MERN-app/chart/mernexample/`) and update the section below with the appropriate values.

```yaml
services:
  mongo:
     url: {uri}
     dbName: {dbname}
     username: {username}
     password: {password}
     env: production
```

## Links

* [Node Programming Guide](https://console.bluemix.net/docs/node/index.html#getting-started-tutorial): Tutorial on Node.js app development.
* [Add a Service to Your App](https://console.bluemix.net/docs/apps/reqnsi.html#add_service): Learn how to add a resource to your cloud native app.

## Learn More

* [Starter Kits](https://console.bluemix.net/developer/appservice/starter-kits/): Enjoyed this application? Check out our Starter Kits.
* [Architecture Center](https://www.ibm.com/cloud/garage/architectures): Explore Architectures that provide flexible infrastructure solutions.

## License
[Apache 2.0](LICENSE)
