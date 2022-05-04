# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Branches

- The master branch demonstrates working with React Query, that's declarative API, background fetching, invalidation queries after a successful mutation.
- PersistQueryClient branch demonstrates offline-first support of React Query (via localstorage). The only problem is that it works only when the network is off while the app is already run, if you're offline and trying to open a browser and go to the app, it'll fail. Since there's only an API call cache, no resources Also, there's a pitfall, i.e., it's an experimental library feature, so it's tested, though the API may change (methods names, signatures). If we stick with it, we have to pin the lib version, and after the feature gets stable, update the code (fortunately, it's only 1 file).
- Service-worker branch demonstrates offline-first support with a service worker, it's able to work if the network is off at the beginning. Though, it requires deliberate cache configuration and revalidation. To try this branch you need to get a prod build (`npm run build`) and serve it with a web-server (`npm i -g serve`, `serve -s build`).
- Worker-and-PersistQueryClient branch demonstrates a combo of the last two, i.e, resource cache via a service worker, API cache via React Query.

## Available Scripts

In the project directory, you can run:

### `npm run fake-server` (starts backend)

Then

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
