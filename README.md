# JavaScript Workshops

The workshop uses an auto-build development environment to transpile ES6/7 code to ES5 with Babel and bundle with Webpack. Node.js is used to run the environment.

## Install

 1. Install Node.js (with npm)
 2. Install/confirm git is installed and clone this repo
 3. Install dependencies using npm
 4. Run the environment to verify

### 1. Install Node.js (with npm)

Install the latest LTS 4+ or Current 6+ version (see note about updating npm version though). Also check that your npm version is 2.x.x, 3.0.0-3.8.7, or 3.10.4+.

 - https://nodejs.org/ - Node.js home page
 - https://nodejs.org/en/download/ - Other Node.js downloads

Confirming the install and versions

```bash
node -v
npm -v
```

Node.js: 4.x.x (LTS) or 6.x.x (Current) (**if using v6.x.x**, check npm version, it might need updating, see below)
NPM: 2.x.x, 3.0.0-3.8.7, or 3.10.4+ (are all acceptable)

**If you want to use Node.js v6.5.0, then you need to update npm** since it has a buggy version of npm (v3.10.3). You can upgrade it using the following command.

You don't need to update npm if you have npm version 2.x.x or 3.0.0-3.8.7, it's only necessary if you have one of the broken versions.

```bash
# updating buggy npm v3.10.3 to a higher version
npm update -g npm
```

After doing this your npm version should be 3.10.7 or higher.


### 2. Confirming git is installed and cloning repo

Git is used to make it easy to pull down the latest changes to the repo for the workshop.

Ensuring that git is installed

```bash
git --version
```

If git isn't installed then visit https://git-scm.com/ to download and install.

To clone this repo to your workstation (pulling down the files you will need)

```bash
git clone https://github.com/codewinds/react-family-subjects.git
```

### 3. Installing the dependencies using npm

```bash
cd react-family-subjects
node verify.js && npm install
```

Note that if `node` is not found on your machine, try `nodejs`. On some machines it is installed with that name due to a conflict.

If the verify script finds that your npm version is outdated it may instruct you on how to update it before continuing with the install.

The install can take several minutes depending on your machine.

Note on some platforms like windows you might get some errors when it tries to install optional packages like `fsevents`. Normally these are ok and the build should continue. If the build ends up failing you might try

```bash
# if your install is failing hard try cleaning cache
npm cache clean
```

Delete your node_modules directory and try the `npm install` again.

Also double check your version of Node and NPM which I mentioned in step 1.

If you still have problems, please see the section below about contacting me for help.

## 4. Run the auto-build dev environment

To start the auto-build dev enviornment and display the index page in your browser.

```bash
npm start
```

(use control-c to interrupt and halt)

Currently this just has some placeholder text but as we get closer to the workshop you will be able to `git pull origin` to get the workshop files. In doing this you won't have to redownload the bulk of the files, it should just be a light update of some source.

## Updating your code as we approach the workshop

I'll be putting out updates with the workshop code as we get closer to the date. To update you simply use `git pull origin`. That will pull down only things that are different which should be minimal. `npm install` will install anything that has changed and you'll be ready to roll.

```bash
git pull origin
npm install
```

## If you have problems getting things installed or running

Please let me know if you have any problems getting things installed and running. I'd like to handle as many of these things in advance so we can focus our workshop time on the material and exercises.

**One common install error is that you have a broken version of npm.** You can fix this by updating your npm as mentioned in install step 1 above.


## Thanks

Thanks for preinstalling the workshop dependencies and verifying operation. By having this repo preinstalled it won't take much to update with my source for the workshop. You never know how conference wifi will hold up so better to have preinstalled. I look forward to working with you at the workshop.

[Follow me on twitter: @jeffbski](https://twitter.com/jeffbski) to get notified about updates for the workshop
