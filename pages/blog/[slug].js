import Container from "components/container"
import ConvertBody from "components/convert-body"
import Meta from "components/meta"
import Pagination from "components/pagination"
import PostBody from "components/post-body"
import PostCategories from "components/post-categories"
import PostHeader from "components/post-header"
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "components/two-column"
import { getAllSlugs, getPostBySlug } from "lib/api"
import { extractText } from "lib/extract-text"
import { prevNextPost } from "lib/prev-next-post"

export default function Post({
  title,
  publish,
  content,
  // eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
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

        <Pagination
          prevText={prevPost.title}
          prevUrl={`/blog/${prevPost.slug}`}
          nextText={nextPost.title}
          nextUrl={`/blog/${nextPost.slug}`}
        />
      
      </article>
    </Container>
  )
}

export async function getStaticPaths() {
  const allSlugs = await getAllSlugs()

  console.log(allSlugs)

  return {
    // paths: ["/blog/schedule", "/blog/music", "/blog/micro"],
    // 取得した全スラッグを、mapでURLの形に加工
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug

  const post = await getPostBySlug(slug)

  const description = extractText(post.content)

  const allSlugs = await getAllSlugs()
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug)

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      // eyecatch: post.eyecatch,
      categories: post.categories,
      description: description,
      prevPost,
      nextPost,
    }
  }
  
}
