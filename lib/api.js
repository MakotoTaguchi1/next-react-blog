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

// 全ての記事のスラッグを取得する関数
export async function getAllSlugs(limit = 100) {
  try {
    const slugs = await client.get({
      endpoint: "blogs",
      // 各記事のtitleとslugを指定し、publishDateの降順でソート
      queries: { fields: "title,slug", orders: "-publishDate", limit: limit}
    })
    return slugs.contents
  } catch(err) {
    console.log("~~ getAllSlugs ~~")
    console.log(err)
  }
}
