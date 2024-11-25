import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

export async function getRelevantImage(keyword: string) {
  try {
    const result = await unsplash.search.getPhotos({
      query: keyword,
      orientation: 'landscape',
      perPage: 1,
    });

    if (result.errors) {
      throw new Error(result.errors[0]);
    }

    const photo = result.response?.results[0];
    if (!photo) {
      throw new Error('No image found');
    }

    return {
      url: photo.urls.regular,
      credit: {
        name: photo.user.name,
        link: photo.user.links.html,
      },
    };
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}