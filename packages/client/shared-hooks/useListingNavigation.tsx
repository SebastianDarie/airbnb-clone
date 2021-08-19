import { NextRouter } from "next/router";
import { useMemo } from "react";

const rootPath = "/create-listing";

let placeholderText: string = "What kind of place will you host?";
let progressBar: number = 9;

export const useListingNavigation = (
  router: NextRouter
): [string, number, () => void] => {
  let nextPage: () => void = () => router.push(`${rootPath}/property-type`);

  return useMemo(() => {
    switch (router.asPath) {
      case `${rootPath}/property-type-group`:
        return [
          (placeholderText = "What kind of place will you host?"),
          (progressBar = 9),
          (nextPage = () => router.push(`${rootPath}/property-type`)),
        ];

      case `${rootPath}/property-type`:
        return [
          (placeholderText = "Which of these best describes your place?"),
          (progressBar = 18),
          (nextPage = () => router.push(`${rootPath}/location`)),
        ];

      case `${rootPath}/location`:
        return [
          (placeholderText = "Where's your place located?"),
          (progressBar = 27),
          (nextPage = () => router.push(`${rootPath}/floor-plan`)),
        ];

      case `${rootPath}/floor-plan`:
        return [
          (placeholderText = "How many guests would you like to welcome?"),
          (progressBar = 36),
          (nextPage = () => router.push(`${rootPath}/amenities`)),
        ];

      case `${rootPath}/amenities`:
        return [
          (placeholderText = "Let guests know what your place has to offer"),
          (progressBar = 45),
          (nextPage = () => router.push(`${rootPath}/photos`)),
        ];

      case `${rootPath}/photos`:
        return [
          (placeholderText = "Next, let's add some photos of your place"),
          (progressBar = 55),
          (nextPage = () => router.push(`${rootPath}/title`)),
        ];

      case `${rootPath}/title`:
        return [
          (placeholderText = "Let's give your place a name"),
          (progressBar = 64),
          (nextPage = () =>
            router.push(`${rootPath}/description?highlights=true`)),
        ];

      case `${rootPath}/description?highlights=true`:
        return [
          (placeholderText = "Now, let's describe your place"),
          (progressBar = 73),
          (nextPage = () => router.push(`${rootPath}/description`)),
        ];

      case `${rootPath}/description`:
        return [
          (placeholderText = "Now, let's describe your place"),
          (progressBar = 73),
          (nextPage = () => router.push(`${rootPath}/price`)),
        ];

      case `${rootPath}/price`:
        return [
          (placeholderText = "Now for the fun part—set your price"),
          (progressBar = 82),
          (nextPage = () => router.push(`${rootPath}/preview`)),
        ];

      case `${rootPath}/preview`:
        return [
          (placeholderText = "Check out your listing!"),
          (progressBar = 100),
          (nextPage = () => null),
        ];

      default:
        return [
          (placeholderText = "What kind of place will you host?"),
          (progressBar = 9),
          (nextPage = () => router.push(`${rootPath}/property-type`)),
        ];
    }
  }, [router.asPath]);
};
