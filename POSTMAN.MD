<h3>1 - Aprenda a utilizar o postman</h3>

```
Os dados utilizados como exemplo vem do próprio repositório.
```

1.1 - GET com postman

```

        1 - Abra a aplicação.

        2 - No menu DropDown selecione o tipo de request (GET)

        3 - em Body selecione "raw" e mais a direita no menu dropdown escolha a opção "JSON(application/json)"

        4 - insira a URL http://localhost:3000

        Resposta: Retorna uma resposta json e o Status do request deve ser de 200.

```

1.2 - POST com postman

```

        1 - Abra a aplicação.

        2 - No menu DropDown selecione o tipo de request (POST)

        3 - em Body selecione "raw" e mais a direita no menu dropdown escolha a opção "JSON(application/json)"

        4 - mais a baixo insira dados em formato Json como por exemplo: {"title": "teste do POST"}

        5 - insira a URL http://localhost:3000/produto

        Resposta: Retorna o que foi digitado e o Status do request deve ser de 200

```

1.3 - PUT com postman

```

        1 - Abra a aplicação.

        2 - No menu DropDown selecione o tipo de request (PUT)

        3 - em Body selecione "raw" e mais a direita no menu dropdown escolha a opção "JSON(application/json)"

        4 - mais a baixo insira dados em formato Json como por exemplo: {"title": "teste do POST"}

        5 - insira a URL http://localhost:3000/produto/1

        Resposta: Retorna o id da URL, o que foi digitado e o Status do Request deve ser de 200

```

1.4 - DELETE com postman

```

        1 - Abra a aplicação.

        2 - No menu DropDown selecione o tipo de request (DELETE)

        3 - em Body selecione "raw" e mais a direita no menu dropdown escolha a opção "JSON(application/json)"

        4 - mais a baixo insira dados em formato Json como por exemplo: {"title": "teste do POST"}

        5 - insira a URL http://localhost:3000/produto/1

        Resposta: Retorna o id da URL, o que foi digitado e o Status do Request deve ser de 200

```

