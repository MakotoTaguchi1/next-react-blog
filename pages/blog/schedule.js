import Container from "components/container"
import ConvertBody from "components/convert-body"
import Meta from "components/meta"
import PostBody from "components/post-body"
import PostCategories from "components/post-categories"
import PostHeader from "components/post-header"
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "components/two-column"
import { getPostBySlug } from "lib/api"
import { extractText } from "lib/extract-text"

export default function Schedule({
  title,
  publish,
  content,
  // eyecatch,
  categories,
  description
}) {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        // pageImg={}
      />
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />
      </article>

      <TwoColumn>
        <TwoColumnMain>
          <PostBody>
            <ConvertBody contentHTML={content} />
          </PostBody>
        </TwoColumnMain>
        <TwoColumnSidebar>
          <PostCategories categories={categories} />
        </TwoColumnSidebar>
      </TwoColumn>
    </Container>
  )
}

export async function getStaticProps() {
  const slug = "schedule"

  const post = await getPostBySlug(slug)

  const description = extractText(post.content)

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      // eyecatch: post.eyecatch,
      categories: post.categories,
      description: description
    }
  }
  
  
  // const resPromise = client.get({
  //   endpoint: "blogs",
  // })

  // // promiseの場合
  // // resPromise.then((res) => console.log(res)).catch((err) => console.log(err))

  // // async/awaitの場合
  // try {
  //   const res = await resPromise
  //   console.log(res)
  // } catch (err) {
  //   console.log(err)
  // }

  // return {
  //   props: {},
  // }
}
