// Output is "DE:123", "DE:123[4.4]", "123-45"
export const buildUrlKey = (signKey: string, signValue: string | undefined) => {
	if (signValue) {
		return `${signKey}[${signValue}]`
	}

	return signKey
}
