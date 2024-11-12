
from deepface import DeepFace
from fastapi import FastAPI, File, UploadFile, HTTPException


app = FastAPI()


def run_picture_deepface(picture):
    result = DeepFace.analyze(picture, actions=['emotion'], enforce_detection=False)
    return result[0]["dominant_emotion"]

# REST in API(eace) my beloved yolo model
# def run_picture(picture):
#     model_result = model.predict(source=picture, stream=False, imgsz=640, conf=0.7, save=False)
#     output = {}
#     for result in model_result:
#         keyed_names = result.names
#         keyed_probs = result.probs.top1
#         output = keyed_names[keyed_probs]
#     return output


@app.post('/predict')
async def upload(file: UploadFile = File(...)):
    result = ""
    try:
        with open(f"storage/app/private/{file.filename}", 'wb') as f:
            while contents := file.file.read(1024 * 1024):
                f.write(contents)
            result = run_picture_deepface(f.name)


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
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["POST"],
        allow_headers=["*"],
    )

    uvicorn.run(app, host="127.0.0.1", port=6969)
