const decodeBase64 = (
    base64: string | null,
): string => {
    if (!base64) {
        return ''
    }

    const bytes = atob(base64)

    const test = Uint8Array.from(
        bytes as ArrayLike<string>,
        m => m.codePointAt(0) as number,
    )

    return new TextDecoder().decode(test)
}

export {
    decodeBase64,
}
