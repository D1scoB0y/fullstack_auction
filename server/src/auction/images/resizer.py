from fastapi import UploadFile
from PIL import Image
from io import BytesIO


async def handle_images(images: list[UploadFile]) -> list[Image.Image]:

    res = []

    for image in images:

        resized_img = await resize(image)

        res.append(resized_img)

    return res


async def resize(image: UploadFile):

    pillow_img = Image.open(BytesIO(await image.read()))

    w = 1600

    k = pillow_img.height / pillow_img.width

    pillow_img = pillow_img.resize(size=(w, int(w*k)))

    return pillow_img
