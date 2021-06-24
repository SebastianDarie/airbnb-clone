import { Photo } from '@airbnb-clone/common';

export const formatFilenames = (
  photos: [File, Photo][],
  folder: string
): void => {
  const date = new Date().toISOString().split('T')[0];
  const randomString = Math.random().toString(36).substring(2, 7);
  photos.forEach((p) => {
    p[1].name = p[1].name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newFilename = `${folder}/${date}-${randomString}-${p[1].name}`;
    p[1].name = newFilename.substring(0, 60);
  });
};
