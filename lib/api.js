import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
})

export async function getPostBySlug(slug) {
  try {
    const post = await client.get({
      endpoint: "blogs", // microCMSのブログのエンドポイント指定
      queries: { filters: `slug[equals]${slug}` },
    })
    return post.contents[0] // 1つ目の記事を指定
  } catch(err) {
    console.log("~~ getpostBySlug ~~")
    console.log(err)
  }
}
