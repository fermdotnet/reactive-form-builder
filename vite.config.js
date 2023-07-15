// vite.config.js
export default {
  root: 'devSrc',
  build: {
    rollupOptions: {
      input: {
        main: '/main.ts'
      }
    }
  },
  server: {
    open: true
  }
};
