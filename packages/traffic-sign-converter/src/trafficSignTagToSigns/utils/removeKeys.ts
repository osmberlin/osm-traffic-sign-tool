/**
 * @desc Removes all keys that include the term `traffic_sign` but preserves values with equal signs (shout those exist…)
 *        Examples: `traffic_sign`, `traffic_sign:backward, `bicycle:right:traffic_sign`
 */
export const removeKeys = (input: string) => {
  const split = input.split('=')

  const likelyTag = split[0]

  // Check if left of "=" is the tag, return the right part
  if (likelyTag?.includes('traffic_sign')) {
    // We cannot use `delete` here because this leaves the empty slot which we would join afterwards
    split.splice(0, 1)
    return split.join('=')
  }

  return input
}
