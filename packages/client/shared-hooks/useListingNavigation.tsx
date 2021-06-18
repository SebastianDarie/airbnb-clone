import { NextRouter } from 'next/router';

// interface useListingNavigationProps {
//   router: NextRouter;
// }

export const useListingNavigation = (
  router: NextRouter
): [string, number, () => void] => {
  const rootPath = '/create-listing';

  let nextPage: () => void = () => router.push(`${rootPath}/property-type`);
  let placeholderText: string = 'What kind of place will you host?';
  let progressBar = 9;

  switch (router.pathname) {
    case `${rootPath}/property-type-group`:
      nextPage = () => router.push(`${rootPath}/property-type`);
      placeholderText = 'What kind of place will you host?';
      progressBar = 9;
      break;

    case `${rootPath}/property-type`:
      nextPage = () => router.push(`${rootPath}/location`);
      placeholderText = 'Which of these best describes your place?';
      progressBar = 18;
      break;

    case `${rootPath}/location`:
      nextPage = () => router.push(`${rootPath}/floor-plan`);
      placeholderText = "Where's your place located?";
      progressBar = 27;
      break;

    case `${rootPath}/floor-plan`:
      nextPage = () => router.push(`${rootPath}/amenities`);
      placeholderText = 'How many guests would you like to welcome?';
      progressBar = 36;
      break;

    case `${rootPath}/amenities`:
      nextPage = () => router.push(`${rootPath}/photos`);
      placeholderText = 'Let guests know what your place has to offer';
      progressBar = 45;
      break;

    case `${rootPath}/photos`:
      placeholderText = "Next, let's add some photos of your place";
      progressBar = 55;
  }

  return [placeholderText, progressBar, nextPage];
};
