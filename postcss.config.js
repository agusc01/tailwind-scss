module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    'postcss-nested': {},
    autoprefixer: {},
    cssnano: { preset: 'default' },
  },
};
