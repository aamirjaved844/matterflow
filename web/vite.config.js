import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      "/info": {
        target: "http://localhost:8000",
        secure: false,
      },
      "/workflow": {
        target: "http://localhost:8000",
        secure: false,
      },
      "/node": {
        target: "http://localhost:8000",
        secure: false,
        bypass: function(req, res, proxyOptions) {
            if (req.url.startsWith('/node_modules')) {
                return req.url;
            }
            return null;
        }
      },
      "/connection": {
        target: "http://localhost:8000",
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.url.startsWith('/connections')) {
              return req.url;
          }
          return null;
        }
      },
      "/flow": {
        target: "http://localhost:8000",
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.url.startsWith('/flows')) {
              return req.url;
          }
          return null;
        }
      },
      "/process": {
        target: "http://localhost:8000",
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.url.startsWith('/processes')) {
              return req.url;
          }
          return null;
        }
      },
      "/model": {
        target: "http://localhost:8000",
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.url.startsWith('/models')) {
              return req.url;
          }
          return null;
        }
      },
      "/instance": {
        target: "http://localhost:8000",
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.url.startsWith('/instances')) {
              return req.url;
          }
          return null;
        }
      },
    },
  },
  plugins: [react()],
});