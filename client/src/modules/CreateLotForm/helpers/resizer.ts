import FileResizer from 'react-image-file-resizer'

const resizeImage = (file: File): Promise<string> =>
    new Promise(resolve => {
        FileResizer.imageFileResizer(
            file,
            200,
            400,
            'JPEG',
            90,
            0,
            url => resolve(url as string),
            'base64',
            200,
            270,
        )
    })

export { resizeImage }
