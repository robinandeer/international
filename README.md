# International

A simple tool to manage translations for an application.

## About

### Built with

- [Zeit Now][now]
- [Next.js][next]
- GitHub

## Getting started

To get up and running, follow these simple example steps.

### Prerequisites

- [now][now]
- node + yarn

### Installation

1. Fork this repository and generate a "[Personal access token][gh-token]".

    Make sure the token includes the "public_repo" scope.

1. Install dependencies

    ```bash
    yarn
    ```

1. Enter your credentials in `.env`

    ```bash
    GITHUB_API_TOKEN=d90089890d012kop12k0j2j32j1kkk
    GITHUB_USERNAME=robinandeer
    GITHUB_REPO=international
    ```

1. Setup the local development environment

    ```bash
    now dev
    ```

1. Open http://localhost:3000 to view the GUI.

### Deploy to production

To use the app you will eventually need to deploy it to production. The easiest solution is to use [Zeit Now][now]. In the repository, simply follow these steps:

1. Update `now.json` with your own repository settings

    ```bash
    {
      "env": {
        "GITHUB_USERNAME": "robinandeer",
        "GITHUB_REPO": "international"
      }
    }
    ```

1. Add the secret GitHub token to Now

    ```bash
    now secrets add github-token d90089890d012kop12k0j2j32j1kkk
    ```

1. Now you can deploy the service

    ```bash
    now
    ```

    Now will give you a URL to the deployment that you can share with your editors.

## Usage

This section will outline the intended usage for the service. There are two types of users: developers & editors. A developer has access to the GitHub repository. An editor only has access to the web app and uses it to update translations.

### Developer

- Add a new language file.

    Add a new JSON file under `/translations/[LANGUAGE].json`. Commit.

- Manage existing translations.

    There is no specific flows for this task. As a developer, just open the relevant translation file and add new translations keys, rename app screens etc.

- Update the version

    TBD.

- Accept translations changes

    Access the repository and open a pull request from the relevant branch. Merge the branch if everything looks good.

- Add screenshots

    Add screenshots for different app screens by updating the repository directly on the default branch. Add PNG images under `/screenshots/[SCREEN]/some-image.png`.

### Editor

1. A developer sends the link to the web app to an editor.

1. The editor visits the app and "logs in" with their email address.

1. The editor updates translations and saves the changes

    This creates a commit on a branch that is based on the editor's email address. The editor can continue making additional changes, resulting in additional commits to the same branch.

### Client app

The client application can consume translations from the same API. However, the difference is that these translations are not fetched directly from GitHub. Instead a developer needs to re-deploy the service to update translations in production.

It's a good idea to increment the API version with every new deploy. That way, each client can check if the translations have been updated since they were last fetched. In the mean time, the app can safely cache the translations locally.

## REST API

See the official [API docs][api-docs] powered by Postman.

<details><summary>GET <code>/api/branches</code></summary>
<p>

List branches in the repo, excluding the base branch.

**Success Response**: 200

```json
{
  "branches": [
    {
      "name": "robin-tests",
      "commit": {
        "sha": "3698ec3b44c72326409ac91056af3b5a29d6f44a",
      },
    }
  ]
}
```

</p>
</details>

<details><summary>POST <code>/api/branches</code></summary>
<p>

Create a new branch in the repo.

**Data example**: body

```json
{
  "name": "test-branch-name"
}
```

**Success Response**: 200

```json
{
  "branch": {
    "ref": "refs/heads/hello-test",
    "object": {
      "sha": "3698ec3b44c72326409ac91056af3b5a29d6f44a",
      "type": "commit",
      "url": "https://api.github.com/repos/robinandeer/international/git/commits/3698ec3b44c72326409ac91056af3b5a29d6f44a"
    }
  }
}
```

</p>
</details>

<details><summary>GET <code>/api/languages</code></summary>
<p>

List available language codes. ISO 639-1 Code.

**Success Response**: 200

```json
{
  "languages": ["en", "sv"]
}
```

</p>
</details>

<details><summary>GET <code>/api/screenshots</code></summary>
<p>

Fetch a list of screenshots for an app screen.

**URL parameter**: `screen=[string]` where `screen` is a string to filter screenshots by app screen (mandatory).

**Success Response**: 200

```json
{
  "screenshots": [
    {
      "name": "welcome-screen-1.png",
      "url": "https://raw.githubusercontent.com/robinandeer/international/master/screenshots/welcome/welcome-screen-1.png"
    }
  ]
}
```

</p>
</details>

<details><summary>GET <code>/api/version</code></summary>
<p>

Get the version of the internationalization API. Can be used to manage caching translations.

**Success Response**: 200

```json
{
  "version": "1.0.0"
}
```

</p>
</details>

<details><summary>GET <code>/api/translations/:language</code></summary>
<p>

Fetch all translations for a language (and optionally from a specific branch).

**URL parameter**: `branch=[string]` where `branch` is the name of the branch to fetch the translations from (optional).

**Success Response**: 200

```json
{
  "language": {
    "welcome": {
      "welcomeLabel": "Välkommen",
      "welcomeDescription": "Logga in för att hantera dina kort se din köp.",
      "signInButton": "Logga in"
    },
    "cards": {
      "screenTitle": "",
      "blockButton": ""
    }
  }
}
```

</p>
</details>

<details><summary>PUT <code>/api/translations/:language</code></summary>
<p>

Update translations for a specific language. This will create a commit with the changes in the specified branch.

**URL parameter**: `branch=[string]` where `branch` is the name of the branch to commit to (mandatory).

**Data example**: body

```json
{
  "language": {
    "welcome": {
      "welcomeLabel": "Välkommen till First Card",
      "welcomeDescription": "Logga in för att hantera dina kort se din köp.",
      "signInButton": "Logga in"
    },
    "cards": {
      "screenTitle": "",
      "blockButton": ""
    }
  }
}
```

**Success Response**: 200

```json
{
  "language": {
    "welcome": {
      "welcomeLabel": "Välkommen till First Card",
      "welcomeDescription": "Logga in för att hantera dina kort se din köp.",
      "signInButton": "Logga in"
    },
    "cards": {
      "screenTitle": "",
      "blockButton": ""
    }
  }
}
```

</p>
</details>

[now]: https://zeit.co
[gh-token]: https://github.com/settings/tokens
[next]: https://nextjs.org
[api-docs]: https://documenter.getpostman.com/view/5200342/SVmsVfiP?version=latest
