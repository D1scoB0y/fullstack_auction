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
            body=f'''Здравсвуйте, {recipient_username}! Перейдите по ссылке для подтверджения адреса электронной почты:
            http://localhost:8000/auth/validate-verification-token?token={token}''',
            subtype=MessageType.plain,
        )


    async def send_message(
            self,
            message: MessageSchema,
            bg_tasks: BackgroundTasks
        ) -> None:

        bg_tasks.add_task(self.__client.send_message, message)


mail_client_config = ConnectionConfig(
    MAIL_USERNAME=config.SMTP_USER,
    MAIL_PASSWORD=config.SMTP_PASSWORD,
    MAIL_FROM=config.SMTP_USER, # type: ignore
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
)


async def get_mail_client(config: ConnectionConfig = mail_client_config):
    return MailClient(config)
