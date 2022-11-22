# Trybe Car Shop

Esse é um dos projetos que eu desenvolvi na Trybe, consiste na API de uma concessionária fictícia que dá acesso à todos os métodos CRUD de um banco de dados MongoDB através de seus endpoints.

## Rodando o código.

Clone o repositório e entre na pasta com:

```sh
$ git clone https://github.com/gralmeidan/trybe-car-shop.git
$ cd trybe-car-shop
```

Suba os contâineres da aplicação com:

```
$ docker-compose up -d
```

E pronto! Por padrão a API é hospedada na porta 3001 do localhost.

Para acessar os logs durante o desenvolvimento utilize:

```
$ docker logs -f car_shop
```

## Rodando os testes.

Conecte-se ao contâiner do node com:

```sh
$ docker exec -it car_shop sh
```

E rode o comando:

```sh
$ npm test
```

## Endpoints da API

### GET `/cars` & `/motorcycles`

Lista todos os carros ou motocicletas cadastrados no banco de dados.

<details>
  <summary>Exemplo de resposta</summary>

- `/cars`:

```json
[
  {
    "id": "634852326b35b59438fbea2f",
    "model": "Marea",
    "year": 2002,
    "color": "Black",
    "status": true,
    "buyValue": 15.99,
    "doorsQty": 4,
    "seatsQty": 5
  },
  ...
]
```

- `/motorcycles`:

```json
[
  {
    "id": "634852326b35b59438fbea2f",
    "model": "Honda Cb 600f Hornet",
    "year": 2005,
    "color": "Yellow",
    "status": true,
    "buyValue": 30.0,
    "category": "Street",
    "engineCapacity": 600
  },
  ...
]
```

</details>

<hr>

### POST `/cars` & `/motorcycles`

Adiciona um carro ou motocicleta ao banco de dados. Em ambos endpoints o campo `status` é opcional e por padrão é definido como `false`

<details>
  <summary>Exemplo de requisição:</summary>

- `/cars`:

```ts
{
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status"?: true,
  "buyValue": 15.990,
  "doorsQty": 4,
  "seatsQty": 5
}
```

- `/motorcycles`:

```ts
{
  "model": "Honda Cb 600f Hornet",
  "year": 2005,
  "color": "Yellow",
  "status"?: true,
  "buyValue": 30.0,
  "category": "Street",
  "engineCapacity": 600
}
```

</details>

<details>
  <summary>Exemplo de resposta</summary>

- `/cars`:

```json
{
  "id": "634852326b35b59438fbea2f",
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status": true,
  "buyValue": 15.99,
  "doorsQty": 4,
  "seatsQty": 5
}
```

- `/motorcycles`:

```json
{
  "id": "6348513f34c397abcad040b2",
  "model": "Honda Cb 600f Hornet",
  "year": 2005,
  "color": "Yellow",
  "status": true,
  "buyValue": 30.0,
  "category": "Street",
  "engineCapacity": 600
}
```

</details>

<hr>

### GET `/cars/:id` & `/motorcycles/:id`

Busca um carro ou motocicleta específico por id.

<details>
  <summary>Exemplo de resposta</summary>

- `/cars`:

```json
{
  "id": "634852326b35b59438fbea2f",
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status": true,
  "buyValue": 15.99,
  "doorsQty": 4,
  "seatsQty": 5
}
```

- `/motorcycles`:

```json
{
  "id": "6348513f34c397abcad040b2",
  "model": "Honda Cb 600f Hornet",
  "year": 2005,
  "color": "Yellow",
  "status": true,
  "buyValue": 30.0,
  "category": "Street",
  "engineCapacity": 600
}
```

</details>

<hr>

### PUT `/cars/:id` & `/motorcycles/:id`

Atualiza um carro ou motocicleta. Nesse endpoint todos os campos são opcionais, mas no mínimo um campo deve ser provido.

<details>
  <summary>Exemplo de requisição:</summary>

- `/cars`:

```ts
{
  "model"?: "Marea",
  "year"?: 2002,
  "color"?: "Black",
  "status"?: true,
  "buyValue"?: 15.990,
  "doorsQty"?: 4,
  "seatsQty"?: 5
}
```

- `/motorcycles`:

```ts
{
  "model"?: "Honda Cb 600f Hornet",
  "year"?: 2005,
  "color"?: "Yellow",
  "status"?: true,
  "buyValue"?: 30.0,
  "category"?: "Street",
  "engineCapacity"?: 600
}
```

</details>

<details>
  <summary>Exemplo de resposta</summary>

- `/cars`:

```json
{
  "id": "634852326b35b59438fbea2f",
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status": true,
  "buyValue": 15.99,
  "doorsQty": 4,
  "seatsQty": 5
}
```

- `/motorcycles`:

```json
{
  "id": "6348513f34c397abcad040b2",
  "model": "Honda Cb 600f Hornet",
  "year": 2005,
  "color": "Yellow",
  "status": true,
  "buyValue": 30.0,
  "category": "Street",
  "engineCapacity": 600
}
```

</details>

<br>

### DELETE `/cars/:id` & `/motorcycles/:id`

Remove um carro ou motocicleta do banco de dados, não recebe nenhum corpo e em caso de sucesso retorna uma resposta com corpo vazio e código de status `204`
