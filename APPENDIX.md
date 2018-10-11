# Native Commands Appendix

This section specifies how to use native commands to do development on this project outside of containers and without the [IBM Cloud Developer Tools](https://github.com/IBM-Cloud/ibm-cloud-developer-tools) CLI.

Note, when running the project with native commands in either dev or release mode, you must provide your own mongo server. See Mongo section below for details.

## Building and running the code

### In development mode

1. Build the project with all dependencies, including dev dependencies, with the command:

    ```bash
    npm install
    ```

2. (Optional) Start a local MongoDB docker container. This will eliminate connection errors when running the below commands. If you do not start a local MongoDB, your commands will run but you will see a connection error.

    ```bash
    docker run -p 27017:27017 mongo
    ```

3. Run the project unit tests with the command:

    ```bash
    npm test
    ```

4. Run the app in dev mode with the command:

    ```bash
    npm run dev 
    ```

    A development web server runs on port 3000 and the app itself runs on port 3100. The web server and app will automatically reload if changes are made to the source.

5. Run the app in interactive debug mode with the command:

    ```bash
    npm run debug
    ```

    The app listens on port 5858 for the debug client to attach to it, and on port 3000 for app requests.

### In release mode

1. Build the project:

    ```bash
    npm install --only=dev; npm run build; npm prune --production
    ```

    Upon completion, webpack has been run and dev dependencies removed.

2. Run the project:

    ```bash
    npm start
    ```

    The app will now run in release mode, listening on port 3000. Hot reload is not available in this mode.

## Deployment options

You can deploy this application with:

1. [Kubernetes](#kubernetes)
2. [Cloud Foundry](#cloud-foundry)
3. [VM and Baremetal](#vm-and-baremetal)

### Kubernetes

You can deploy to Kubernetes using the following steps:

1. Build the app with Docker:

```bash
$ docker build .

Sending build context to Docker daemon  1.438MB
Step 1/12 : FROM node:8
...
Successfully built 442120e8d5fd
```

2. Tag the Docker image

```bash
docker tag 442120e8d5fd stevemar/sm-local-mernexample
```

3. Publish the image to a registry (e.g. dockerhub)

```bash
docker push stevemar/sm-local-mernexample
```

4. Update helm charts prior to deployment. Edit `values.yaml` to ensure suitable values for the Docker image name and location, for example:

```ini
repository: docker.io/stevemar/sm-local-mernexample
tag: latest
```

5. Deploy to a Kubernetes service using `helm install`. _The output below has been trimmed for readability._

```
$ helm install chart/mernexample
NAME:   pilfering-ladybird
LAST DEPLOYED: Tue Aug 28 11:29:09 2018
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1beta1/Deployment
NAME                    DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
mernexample-deployment  1        1        1           0          1s
mongo-deployment        1        1        1           0          0s

==> v1/Service
NAME                 CLUSTER-IP      EXTERNAL-IP  PORT(S)          AGE
mongo                172.21.67.175   <nodes>      27017:30308/TCP  1s
mernexample-service  172.21.231.153  <nodes>      3000:32080/TCP   1s
```

6. View the application

To view the application go to `http://<cluster-external-IP>:<external-port>` in a browser. It should look something like this: `http://169.47.252.58:32080`

To find the external IP address of your Kubernetes cluster, there are two options, using the Kubernetes dashboard or `kubectl` CLI:

   * In a Kubernetes dashboard go to the _Nodes_ menu and find the _ExternalIP_ address

   ```
   Addresses:
   InternalIP: 10.177.184.198 ExternalIP: 169.47.252.58 Hostname: 10.177.184.198
   ```

   * Or run the command below [from the Kubernetes Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/#viewing-finding-resources):

   ```bash
   $ kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}'
   169.47.252.58
   ```

Lastly, we'll need the external port. This was already given to us in the previous step after the `helm` command, but you can find it using:

```
$ kubectl get services
NAME                  TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)           AGE
kubernetes            ClusterIP   172.21.0.1       <none>        443/TCP           17h
mernexample-service   NodePort    172.21.231.153   <none>        3000:32080/TCP    5h
mongo                 NodePort    172.21.67.175    <none>        27017:30308/TCP   5h
```

Where the column labeled `PORT(S)` has two values. The port number on the left is the internal / guest port from the container. The port number on the right is the external port. The external port is what you will use to access your application.

### Cloud Foundry

You can deploy to Cloud Foundry using:

```bash
cf push
```

### VM and Baremetal

You can install and run your app on bare metal or virtual machine environments conventionally:

1. delete `node_modules`
2. create app archive (e.g. zip up directory)
3. copy to target machine
4. unwind (e.g. unzip archive)
5. run `npm install`
6. run `npm start`