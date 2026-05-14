# 12_部署

## 使用Gunicorn和Uvicorn
```bash
pip install gunicorn uvicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## 使用Docker
```dockerfile
FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
```

## requirements.txt
```
fastapi
uvicorn
pydantic
```

## Nginx反向代理
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
