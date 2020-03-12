# Warning: This starterkit will be deprecated soon. If you would like an example IBM StarterKit that uses Node.js with a Database integration, please use https://github.com/IBM/nodejs-cloudant

# Create and deploy a cloud native web application using the MERN (MongoDB, Express, React, Node.js) stack

This repository has code to create a web app that is pre-configured with the MERN stack (MongoDB, Express.js, React, Node.js). We use IBM Cloud services to host our application; the IBM Cloud Developer Tools CLI to run and debug locally; and lastly provide native commands to deploy your app to Cloud Foundry or a Kubernetes cluster. You can also deploy your app to a Red Hat OpenShift cluster, but you must use the IBM Cloud console instead of the CLI. OpenShift is available only through a standard cluster, which requires you to have a billable account.

By running this code, you'll understand how to:
* Build an application that uses MongoDB, Express.js, React, and Node.js.
* Create an application for monitoring and distributed tracing using App Metrics.
* Deploy an application using the IBM Cloud Developer Tools CLI or natively with Cloud Foundry or Kubernetes. For OpenShift deployments, use the IBM Cloud console instead of the CLI.

![](https://github.com/IBM/pattern-utils/raw/master/mern-starter/architecture.png)

## Flow

1. The user views the React web app with a browser.
2. The React front end communicates with the Express back end via RESTful APIs.
3. The back-end Express application uses the Mongo database for storing and retrieving data.
4. Back-end results are communicated back to the front end.
5. Front-end results are rendered in a human-readable format to the user.

## Included Components

* [IBM Cloud](https://cloud.ibm.com/docs/overview?topic=overview-whatis-platform): Provides a computing platform that includes a catalog of cloud services which can be integrated with PaaS and IaaS to build business applications.
* [Kubernetes Cluster](https://cloud.ibm.com/docs/containers?topic=containers-getting-started): Create and manage your cloud infrastructure and use Kubernetes as your container orchestration engine.
* [MongoDB](https://cloud.ibm.com/docs/infrastructure/database-tools?topic=database-tools-dbt-mongodb): Fully featured NoSQL server that is horizontally scalable to meet your enterprise-class database service needs.
* [Express](https://expressjs.com/): Most popular and minimalistic web framework for creating API and Web server.
* [React](https://reactjs.org/): JavaScript library for building user interfaces.

## Featured Technologies

* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.
* [Containers](https://www.ibm.com/cloud/container-service): Virtual software objects that include all the elements that an app needs to run.
* [Cloud native](https://github.com/cncf): Cloud native is an approach to building and running applications that exploit the advantages of the cloud computing delivery model.

## Getting Started

> As an alternative to the steps below, you can [create this project as a starter kit on IBM Cloud](https://cloud.ibm.com/developer/appservice/create-app?starterKit=6da47a55-cff8-344d-a8ec-08a24c9e1936), which automatically provisions required services and injects service credentials into a custom fork of this pattern. Cloud Foundry, Kubernetes, and Red Hat OpenShift are available as deployment targets when you use the starter kit.

Install the latest version of the [IBM Cloud Developer Tools](https://github.com/IBM-Cloud/ibm-cloud-developer-tools) CLI.

* For macOS and Linux, run the  following command:
  ```
  curl -sL https://ibm.biz/idt-installer | bash
  ```

* For Windows 10 Pro, run the following command in a PowerShell prompt as Admistrator:
  ```
  [Net.ServicePointManager]::SecurityProtocol = "Tls12"; iex(New-Object Net.WebClient).DownloadString('https://ibm.biz/idt-win-installer')
  ```

> *NOTE:* IDT builds and runs the project using Docker containers, the recommended approach for cloud native development. However, direct use of native tools (e.g. npm) is also supported. See the [Appendix](APPENDIX.md) for more information.

## Building your MERN app

The starter project supports the concept of dev mode and release mode.  In dev mode, the starter app runs with dev dependencies installed and hot reload enabled for both the front-end and back-end aspects of the app. Dev mode is intended for use during app development. Release mode excludes dev dependencies and runs the app without hot reload. Release mode is intended for running in production.

#### Working in development mode

1. Build the project with all dependencies, including dev dependencies, with the following command:

    ```
    ibmcloud dev build --debug
    ```    

    > *NOTE:* Ensure a Docker daemon is running before issuing this command.

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

2. [http://localhost:3000/health](http://localhost:3000/health)

   ![](https://github.com/IBM/pattern-utils/raw/master/mern-starter/health.png)

## Deploying your MERN app

These projects are designed for deployment to IBM Cloud through the IBM Cloud Developer Tools CLI, to Kubernetes (public or private cloud) or Cloud Foundry (public cloud only).

Before deploying your MERN app, you will need to sign in to [IBM Cloud](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#step3-configure-idt-env) through the command line.

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

An interactive session will begin where you'll be prompted for a new or existing IBM Cloud Kubernetes Service cluster name. Once the cluster is validated and the Docker registry confirmed the app will be deployed to a Kubernetes cluster. _The following output has been trimmed for readability._

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

* Create a managed instance of MongoDB by searching for **Compose for MongoDB** in the [Catalog](https://cloud.ibm.com/catalog/)
* Once created go to the _Service credentials_ menu and create a new credential.
* Copy the `uri` to a text file, we'll need to parse the content out.
* From the `uri` we will need to extract the `username`, `password`, and `mongo_url`. The text is in the form of `mongodb://{username}:{password}@{mongo_url}`.

![](https://github.com/IBM/pattern-utils/raw/master/compose-dbs/mongo-creds.png)

> *NOTE*: Alternatively, you may install MongoDB natively. Refer to the [install instructions](https://docs.mongodb.com/manual/administration/install-community).

### Configuring MongoDB

Connecting to MongoDB is done in the file [server/routers/mongo.js](server/routers/mongo.js). It is controlled through environment variables. See the following sample set of credentials.

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

* [Node Programming Guide](https://cloud.ibm.com/docs/node?topic=nodejs-getting-started): Tutorial on Node.js app development.
* [Adding a service to your app](https://cloud.ibm.com/docs/apps?topic=creating-apps-add-resource): Learn how to add a service to your cloud native app.

## Learn More

* [Starter Kits](https://cloud.ibm.com/developer/appservice/starter-kits/): Enjoyed this application? Check out our Starter Kits.
* [Architecture Center](https://www.ibm.com/cloud/garage/architectures): Explore Architectures that provide flexible infrastructure solutions.

## License
This code pattern is licensed under the Apache Software License, Version 2.  Separate third party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
