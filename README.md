# Setup

    yarn

## Generate Storybook Loader

    yarn make-storybook

**NOTE**: Otherwise the file `storyLoader.js` is missing and bundling will fail.

# Enter Storybook Mode

Storybook Mode is enabled via environment variables handled by [react-native-config](https://github.com/luggit/react-native-config).

To enter Storybook Mode, create `.env` with

    IS_STORYBOOK=true
