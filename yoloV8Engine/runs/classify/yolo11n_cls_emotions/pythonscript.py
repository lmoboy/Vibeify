from ultralytics import YOLO
from fastapi import FastAPI, File, UploadFile, HTTPException
model = YOLO("C:\\laragon\\www\\Vibeify\\yoloV8Engine\\yolo11n-cls.pt", task="classify", verbose=True)
app = FastAPI()

def run_picture(picture):
    return model.predict(source=picture, task="classify", stream=False, imgsz=640, conf=0.7)


@app.post('/predict')
def upload(file: UploadFile = File(...)):
    try:
        with open(file.filename, 'wb') as f:
            while contents := file.file.read(1024 * 1024):
                f.write(contents)
    except Exception:
        raise HTTPException(status_code=500, detail='Something went wrong')
    finally:
        file.file.close()

    return {"message": f"Successfully uploaded {file.filename}"}
