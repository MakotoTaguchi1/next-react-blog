import Container from "components/container"
import { getPostBySlug } from "lib/api"

export default function Schedule({
  title,
  publish,
  content,
  eyecatch,
  categories,
}) {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  )
}

export async function getStaticProps() {
  const slug = "schedule"

  const post = await getPostBySlug(slug)

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      // eyecatch: post.eyecatch,
      categories: post.categories,
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
