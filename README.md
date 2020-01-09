# Codebase for article "Shutdown correctly Node.js apps"

This is the codebase used in the [article](https://yvonnickfrin.dev/shutdown-correctly-nodejs-apps). 

Files:
- [server](/index.js)
- [webhook](/webhooks.js)

You need to start webhooks before index.

Execute the following command in a terminal:

```sh
node webhooks.js
```

Open a new terminal and execute this other command:

```sh
node index.js
```

After a few seconds press `Ctrl+C` and see how the server shuts down.
