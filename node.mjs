export default function node(value = null, key = null) {
  return {
    value,
    key,
    nextNode: null,
  };
}
