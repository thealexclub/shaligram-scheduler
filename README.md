# RAPID Platform - Time Logs Scheduler

## Scripts

```
yarn start
```
starts esbuild serving the project on `localhost:9000`

## Setup

For brevity and security some required parts of this repo are included in the `.gitignore` those parts are:

- the `rapid_modules` folder, containing compressed `.tgz` versions of some internal RAPID Platform packages.
- the `www` folder, containing some built `.js` files and the `index.html` file.
- the `src/Assets` folder, containing css, fonts, and images.

These will need to be added by the developer before attempting to `start` the project. If these resources are unavailable to you, please reach out to Alex or Mitch on teams or via email.

### index.html

Below a template `index.html` with all secrets removed.

```
<!DOCTYPE html>
<html lang="en">

<head>
  <title></title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="/">
  <script>
    RAPID_CLIENT_ID = `CLIENT_ID_GOES_HERE`;
    RAPID_CLIENT_SCOPES = 'CLIENT_SCOPES_GO_HERE';
  </script>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="js/index.css" />
  <link rel="stylesheet" href="bundle.css" />
</head>

<body>
  <div id="root">
  <script type="module" src="js/index.js"></script>
  <script type="module" src="bundle.js"></script>
</body>

</html>
```

This needs to be placed at `./www/index.html` with the `RAPID_CLIENT_ID` and `RAPID_CLIENT_SCOPES` you have been provided added.