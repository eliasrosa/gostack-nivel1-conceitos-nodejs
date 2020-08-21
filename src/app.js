const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// list
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});


// insert
app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  //
  repositories.push(repository);

  //
  return response.json(repository);
});


// update
app.put("/repositories/:id", (request, response) => {

  //
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const index = repositories.findIndex((repository) => {
    return repository.id === id;
  });

  if (index === -1) {
    return response.status(400).send();
  }

  //
  repositories[index] = { ...repositories[index], title, url, techs };
  return response.json(repositories[index]);
});

// delete
app.delete("/repositories/:id", (request, response) => {

  //
  const { id } = request.params;
  const index = repositories.findIndex((repository) => {
    return repository.id === id;
  });

  if (index === -1) {
    return response.status(400).send();
  }

  //
  repositories.splice(index, 1);
  return response.status(204).send();
});

// insert like
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((repository) => {
    return repository.id === id;
  });

  if (index === -1) {
    return response.status(400).send();
  }


  repositories[index].likes += 1;
  return response.json(repositories[index]);

});

module.exports = app;
