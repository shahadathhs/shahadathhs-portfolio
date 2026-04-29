// Fiverr profile and gigs - commented out as per user request
// /** Public seller profile */
// export const fiverrProfileUrl =
//   'https://www.fiverr.com/shahadath_sajib?public_mode=true';

// export const fiverrGigs = [
//   {
//     label: 'DevOps & Linux server',
//     description: 'Deploy and manage Linux servers and web apps',
//     href: 'https://www.fiverr.com/shahadath_sajib/set-up-deploy-and-manage-your-linux-server-and-web-app',
//   },
//   {
//     label: 'Backend API',
//     description: 'Fast, secure, scalable backend APIs',
//     href: 'https://www.fiverr.com/shahadath_sajib/build-a-fast-secure-and-scalable-backend-api-for-your-app',
//   },
// ] as const;

// Placeholder exports to prevent build errors
export const fiverrProfileUrl = '#';
export const fiverrGigs: readonly {
  label: string;
  description: string;
  href: string;
}[] = [];
