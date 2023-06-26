from fastapi_mail import FastMail, ConnectionConfig

from src.config import config


mail_client_config = ConnectionConfig(
    MAIL_USERNAME=config.SMTP_USER,
    MAIL_PASSWORD=config.SMTP_PASSWORD,
    MAIL_FROM=config.SMTP_USER, # type: ignore
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
)



async def get_mail_client() -> FastMail:
    return FastMail(mail_client_config)
