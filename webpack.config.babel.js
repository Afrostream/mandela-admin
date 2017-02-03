import autoprefixer from 'autoprefixer';

export default {
  module: {
    loaders: [
      {
        test: /\.less$/,
        loaders: ['style?insertAt=top', 'css', 'postcss', 'less'],
      },
    ],
  },
  postcss: [autoprefixer()],
}
