import localFont from 'next/font/local';

export const azonix = localFont({
  src: './Azonix.otf',
  variable: '--font-azonix',
  display: 'swap',
});

// modernSans is missing binaries, using fallback to system fonts for now
export const modernSans = {
  variable: '--font-modernsans',
};
