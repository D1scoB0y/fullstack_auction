from fastapi import UploadFile
from PIL import Image
from io import BytesIO


async def handle_images(images: list[UploadFile]) -> list[Image.Image]:

    resized_images = []

    for image in images:

        pillow_img = Image.open(BytesIO(await image.read()))

        resized_img = await resize(pillow_img)

        resized_images.append(resized_img)

    return resized_images


async def resize(img: Image.Image):

    w = 1600

    k = img.height / img.width

    resized_img = img.resize(size=(w, int(w*k)))

    return resized_img
