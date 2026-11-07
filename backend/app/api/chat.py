
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.ai.service import generate_response

router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)


class ChatResponse(BaseModel):
    reply: str


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):

    try:
        reply = await generate_response(request.message)

        return ChatResponse(reply=reply)

    except RuntimeError as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    except Exception as error:
        print("Gemini API Error:", repr(error))

        raise HTTPException(
            status_code=502,
            detail="Unable to generate an AI response. Check backend terminal."
        )
