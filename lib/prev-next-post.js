export function prevNextPost(allSlugs, currentSlug) {
  const numberOfPosts = allSlugs.length

  const index = allSlugs.findIndex(
    ({ slug }) => slug === currentSlug,
  )

  // 配列の最初の方ほど新しい記事であることに注意
  // 前の記事（古い記事）
  const prevPost =
    index + 1 === numberOfPosts
      ? { title: "", slug: "" }
      : allSlugs[index + 1]

  // 次の記事（新しい記事）
  const nextPost =
    index === 0
      ? { title: "", slug: "" }
      : allSlugs[index - 1]

  return [prevPost, nextPost]
}
