import localFont from 'next/font/local';

export const sfPro = localFont({
  src: [
    {
      path: '../public/fonts/sf-pro-display-regular.woff',
      weight: '400',
      style: 'normal',
    },

  ],
  variable: '--font-sf',
  display: 'swap',
});
