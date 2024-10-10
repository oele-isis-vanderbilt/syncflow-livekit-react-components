import asyncio
import os

from datetime import timedelta
from livekit import api 
from dotenv import load_dotenv

async def get_token():
    access_token = api.AccessToken().\
    with_identity("DemoRoomMonitor").\
    with_grants(
        grants=api.VideoGrants(
            room_join=True,
            can_subscribe=True,
            can_publish=True,
            room="ReactRoom",
            room_list=True,
            can_publish_data=True,
            can_update_own_metadata=True,
            room_admin=True,
            agent=False
        )
    ).with_ttl(timedelta(days=7)).to_jwt()
    print(access_token)
    return access_token

if __name__ == '__main__':
    PREFIX = "VITE"
    load_dotenv()
    os.environ["LIVEKIT_API_KEY"] = os.getenv(f"{PREFIX}_LIVEKIT_API_KEY")
    os.environ["LIVEKIT_API_SECRET"] = os.getenv(f"{PREFIX}_LIVEKIT_API_SECRET")
    os.environ["LIVEKIT_URL"] = os.getenv(f"{PREFIX}_LIVEKIT_URL")
    asyncio.run(get_token())




