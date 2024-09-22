export default {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],    
    framework: '@storybook/react-vite', // 👈 Add this
    staticDirs: ['../public'],
    webpackFinal: async (config, { configType }) => {
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            /..\/src\/API\.jsx/,
            '../src/API_mocked.jsx'
          )
        );
      }   
 
};

