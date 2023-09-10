from fastapi import UploadFile
from PIL import Image
from io import BytesIO


async def handle_images(images: list[UploadFile]) -> list[Image.Image]:

    resized_images = []

    for index, image in enumerate(images):

        pillow_img = Image.open(BytesIO(await image.read()))

        if index == 0:
            resized_preview = await resize_preview(pillow_img)
            resized_images.append(resized_preview)

        resized_img = await resize(pillow_img)

        resized_images.append(resized_img)

    return resized_images


async def resize(img: Image.Image):

    w = 1600

    k = img.height / img.width

    resized_img = img.resize((w, int(w*k)))

    return resized_img


async def resize_preview(img: Image.Image):

    w = 400

    k = img.height / img.width

    resized_img = img.resize((w, int(w*k)), Image.Resampling.LANCZOS)

    if resized_img.height > 500:

        x1, y1 = 0, (resized_img.height - 500) // 2

        x2, y2 = resized_img.width, ((resized_img.height - 500) // 2) + 500

        resized_img = resized_img.crop((x1, y1, x2, y2))

    return resized_img
