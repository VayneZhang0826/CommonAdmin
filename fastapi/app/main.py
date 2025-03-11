import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.api_v1.api import api_router

app = FastAPI()
app.include_router(api_router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


# 当一个 Python 文件被直接运行时，__name__ 的值会被设置为 "__main__"。
# 然而，当这个文件被其他模块导入时，__name__ 的值则会被设置为该文件的模块名。
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)