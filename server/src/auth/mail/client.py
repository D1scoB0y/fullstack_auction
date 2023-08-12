from fastapi import BackgroundTasks
from fastapi_mail import FastMail, ConnectionConfig, MessageSchema, MessageType

from src.config import config


class MailClient:
    '''Mail client can provide convenient verification
    message generator and `send_message` method'''

    def __init__(self, config: ConnectionConfig) -> None:
        self.__client = FastMail(config)


    async def generate_verification_message(self, recipient_username: str, recipient_email: str, token: str) -> MessageSchema:
        return MessageSchema(
            recipients=[recipient_email], # type: ignore
            subject='Подтвердите почту для FotoJager`s Auctions',
            body=f'''Здравствуйте, {recipient_username}! Перейдите по ссылке для подтверджения адреса электронной почты:
            {config.CLIENT_ORIGIN}/email-verification?token={token}''',
            subtype=MessageType.plain,
        )


    async def send_message(
            self,
            message: MessageSchema,
            bg_tasks: BackgroundTasks
        ) -> None:

        bg_tasks.add_task(self.__client.send_message, message)


mail_client_config = ConnectionConfig(
    MAIL_USERNAME=config.MAIL_SENDER,
    MAIL_PASSWORD=config.MAIL_PASSWORD,
    MAIL_FROM=config.MAIL_SENDER, # type: ignore
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
)

mail_client = MailClient(mail_client_config)
