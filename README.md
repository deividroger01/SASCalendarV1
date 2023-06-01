# SASCalendarV1
Projeto de TCC do curso de Análise e Desenvolvimento de Sistemas.

Antes de clonar esse sistema, é necessário:

Uma conta no MongoDB: https://account.mongodb.com/account/login e criar um banco de dados.
Acessar a plataforma Google Cloud e criar as credenciais, desta forma, você terá o ID do cliente e uma chave secreta: https://console.cloud.google.com/apis/
Acessar a plataforma Google Developers > OAuth 2.0 Playground e gerar o refresh_token: https://developers.google.com/oauthplayground

Para que o código funcione como esperado, inclua:

Arquivo .env na raiz da pasta backend contendo:

DB_USER=usuario_do_mongodb
DB_PASS=senha_do_mongodb

GOOGLE_CLIENT_ID=client_id_do_google_cloud_apis
GOOGLE_CLIENT_SECRET=chave_secreta_do_googleAPIs

GOOGLE_CLIENT_REFRESH_TOKEN=refresh_token_do_google_oauth20_playground

CLIENT_URL=http://localhost:3000/ (para rodar localmente)

COOKIE_SECRET=secret_da_session_referente_ao_cookie_session (pode ser um valor aleatorio)

Arquivo .env na raiz da pasta frontend/frontend contendo:

REACT_APP_API_URL=http://localhost:5000 (para rodar localmente)

Não esqueça de importar os node_modules na pasta backend e na pasta frontend/frontend.
