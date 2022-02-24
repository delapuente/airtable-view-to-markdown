# Airtable View to Markdown

> Convert Airtable views to Markdown.

## Prerequisites

This app runs on Node.js. After [installing Node.js](https://nodejs.org/en/download/package-manager/), install the Airtable Blocks CLI:

```
npm install -g @airtable/blocks-cli
```

Now grab your API key from your [Airtable Account page](https://airtable.com/account/) and run the following command:

```
block set-api-key YOUR_API_KEY
```

## Install the app in Airtable

Follow Airtable [Remix from GitHub](https://www.airtable.com/developers/apps/guides/remix-from-github) guide using the repository `https://github.com/delapuente/airtable-view-to-markdown`.

## Develop locally

### Install dependencies

Clone the repository, enter the project directory and run the following command to install the dependencies:

```
npm install
```
### Setup the project

You need to configure the remote, which is an Airtable identifier indicating you want to run this app in an specific Airtable base.

Follow the guide at [Remix from GitHub](https://www.airtable.com/developers/apps/guides/remix-from-github) but skip any command line-related step. Stop when it tells you to run the `block init` command.

The string following the `block init` command is the remote identifier. It has the following format: `<baseId>/<blockId>`.

Edit `.blocks/remote.json` and fill in the `baseId` and `blockId` fields with the values in the remote.

### Run the app server

Now run the following command from the root of the project directory:

```
block run
```

The running server URL should be displayed in the terminal.

Skip all the command line-related steps until Airtable asks you to copy the "App URL". Copy the server URL and paste it here.

Your app should be running and connected to your Airtable base. Every time you change some code, the app will automatically update the view.

Happy coding!
