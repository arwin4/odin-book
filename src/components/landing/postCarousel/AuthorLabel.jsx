export default function AuthorLabel({ post }) {
  const { firstName } = post.relationships.author.data.attributes;
  // TODO: prevent firstName overflow (limit chars at ~30?)

  return firstName;
}
