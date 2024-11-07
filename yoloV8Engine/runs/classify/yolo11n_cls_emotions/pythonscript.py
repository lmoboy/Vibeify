from ultralytics import YOLO
from fastapi import FastAPI, File, UploadFile, HTTPException
model = YOLO("C:\\laragon\\www\\Vibeify\\yoloV8Engine\\yolo11n-cls.pt", task="classify", verbose=True)
app = FastAPI()

def run_picture(picture):
    model_result = model.predict(source=picture, stream=False, imgsz=640, conf=0.5)
    output = {}
    for result in model_result:
        keyed_names = result.names
        keyed_probs = result.probs.top1
        output = keyed_names[keyed_probs]
    return output


@app.post('/predict')
async def upload(file: UploadFile = File(...)):
    result = ""
    try:
        with open(f"storage/app/private/{file.filename}", 'xb') as f:
            while contents := file.file.read(1024 * 1024):
                f.write(contents)
            result = run_picture(f.name)
            

    except Exception as err:
        raise HTTPException(status_code=500, detail='Something went wrong: ' + str(err))
    finally:
        file.file.close()

    return {'success':f"Successfully uploaded {file.filename}", 'result':str(result)}

if __name__ == "__main__":
    import uvicorn
    from fastapi.middleware.cors import CORSMiddleware

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allows all origins
        allow_credentials=True,
        allow_methods=["*"],  # Allows all methods
        allow_headers=["*"],  # Allows all headers
    )

    uvicorn.run(app, host="127.0.0.1", port=6969)
