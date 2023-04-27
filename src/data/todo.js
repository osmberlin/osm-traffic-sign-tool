/**
 * name (string)
 *     Mainly for display, however starting with "Zusatz" interpreted as "not main sign"
 *
 * comment (string)
 *     For display only, explaining the sign further
 *
 * cat (integer)
 *     Id referring to a category, used to group signs together for display
 *
 * key (string)
 *     A key to be added, has to go together with "value" or "value_prompt"
 *
 * value (string)
 *     Has to have a value set, in this case "static_tags" is probably preferred to be cleaner
 *
 * value_prompt (object)
 *    The user is prompted to enter a value (also saved in the permalink), which is then set to "value"
 *
 *    comment: Shown to the user
 *    default_value: the default value shown when inputting and when no other value is provided
 *    format: "float" or "integer", mainly for loading from permalink for now, maybe other validation later,
 *            other values simply impose no restrictions, but may be used for display or otherwise
 *
 * is_conditional (boolean)
 *     If true, this "value" is a conditional, meaning it restricts the main signs tags somehow (e.g. only Mo-Fr)
 *
 * static_tags (object)
 *     Key/value pairs that get added to tags (the keys should also be put in single quotes, as a convention
 *     to make it easier to read)
 *
 * restriction_keys (array)
 *     Several keys, expecting restriction values from sub-signs, otherwise is added with value "no"
 *
 * restriction_value (string)
 *     Used in sub-signs to set a restriction value to any available restriction key
 *
 * implied_key (string)
 *     If a sub-sign wants to set a restriction value (e.g. destination), this key will be added, but otherwise not
 *     (the special value "conditional" will add a ":conditional" tag with "none", with the restriction value
 *     as condition, which is required for restritcion keys that can't take additional restritcion likes, e.g.
 *     [maxweight=destination] is not possible)
 *
 * links (array)
 *     One or several links starting with "http" (page name separated by a space) or OSM Wiki pages as
 *     only the Wiki page name
 *
 * tag_comment (string)
 *     Added below the tags when this sign is used, can contain tags as [key=value] or just [value]
 *
 * tag_comment_req_key (string)
 *     The "tag_comment" only gets added when this key is already present in the tags
 *
 */

/*
signs['1020-31'] = {
	name:'Zusatzzeichen 1020-31',
	comment:'Anlieger oder Parken frei',
	cat:4
};
*/
