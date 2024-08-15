Este é um sistema de gerenciamento de pacientes que permite criar, visualizar, atualizar e deletar registros de pacientes. O sistema foi desenvolvido utilizando uma arquitetura serverless, com o front-end em React e o back-end em Node.js, hospedado na AWS.

## Tecnologias Utilizadas
Frontend: React (TypeScript), Material UI, React Hook Form, Redux Saga
Backend: Node.js, AWS Lambda, AWS API Gateway
Banco de Dados: AWS DynamoDB
Funcionalidades
CRUD Completo: Gerenciamento de registros de pacientes (nome, data de nascimento, email e endereço).
Paginação: Manipulação eficiente de grandes conjuntos de dados com consultas paginadas.
Validação de Campos: Validação tanto no front-end quanto no back-end (ex: data de nascimento, campos obrigatórios, limites de comprimento).
Gerenciamento de Estado: Utilizando Redux Saga para gerenciamento de estado global.
