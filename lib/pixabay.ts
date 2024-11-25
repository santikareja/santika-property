import { z } from "zod";

const pixabayResponseSchema = z.object({
  hits: z.array(
    z.object({
      id: z.number(),
      webformatURL: z.string(),
      largeImageURL: z.string(),
      user: z.string(),
      pageURL: z.string(),
    })
  ),
});

export async function getRelevantImage(keyword: string) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(
        keyword
      )}&image_type=photo&orientation=horizontal&per_page=3&lang=id`
    );

    const data = await response.json();
    const parsed = pixabayResponseSchema.parse(data);

    if (parsed.hits.length === 0) {
      throw new Error('No image found');
    }

    // Get a random image from the first 3 results
    const randomIndex = Math.floor(Math.random() * Math.min(3, parsed.hits.length));
    const image = parsed.hits[randomIndex];

    return {
      url: image.largeImageURL,
      credit: {
        name: image.user,
        link: image.pageURL,
      },
    };
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}