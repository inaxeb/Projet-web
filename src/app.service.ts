import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>API Task Manager</title>
        <style>
          body {
            background-color: #1a1a2e;
            color: #e94560;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Courier New', Courier, monospace;
            text-align: center;
          }
          h1 {
            font-size: 3rem;
            text-shadow: 0 0 10px #e94560, 0 0 20px #e94560;
            margin-bottom: 20px;
          }
          p {
            color: #16213e;
            background-color: #0f3460;
            padding: 15px 30px;
            border-radius: 5px;
            font-size: 1.2rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            color: #fff;
          }
          a {
            color: #4cc9f0;
            text-decoration: none;
            margin-top: 20px;
            font-weight: bold;
            border: 2px solid #4cc9f0;
            padding: 10px 20px;
            border-radius: 30px;
            transition: all 0.3s ease;
          }
          a:hover {
            background-color: #4cc9f0;
            color: #1a1a2e;
            box-shadow: 0 0 15px #4cc9f0;
          }
          .emoji {
            font-size: 2rem;
          }
        </style>
      </head>
      <body>
        <div class="emoji">🚀</div>
        <h1>Hey, si tu es ici c'est qu'on est pas mal !</h1>
        <p>L'API tourne parfaitement sur le port 3000.</p>
        <div style="display: flex; gap: 20px;">
          <a href="/api">Accéder à la documentation Swagger</a>
          <a href="http://localhost:8081" target="_blank" style="border-color: #e94560; color: #e94560;">Voir la Base de Données (PgWeb)</a>
        </div>
      </body>
      </html>
    `;
  }
}
