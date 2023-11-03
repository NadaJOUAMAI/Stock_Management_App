import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "vuejs",
  })


app.get("/Brands", (_request,_response) => {
    const q = "SELECT * FROM brand";
    db.query(q, (err, data) => {
      if (err) return _response.json(err);
      return _response.json(data)
      })
  })


  app.post("/Brands/add", (_request, _response) => {
    const q = "INSERT INTO brand (`name`, `description`) VALUES (?, ?)";
    const values = [
      _request.body.name,
      _request.body.description,
    ];
    db.query(q, values, (err, data) => {
      if (err) {
        return _response.json(err);
      }
      return _response.json("Brand has been created successfully");
    });
  });

app.delete("/Brands/:id", (_request, _response) => {
  const brandId = _request.params.id;
  const q = " DELETE FROM brand WHERE id = ? ";

  db.query(q, [brandId], (err, data) => {
    if (err) return _response.json (err); 
    return _response.json("Brand has been deleted successfully");
  });
});

app.put("/Brands/:id", (_request, _response) => {
  const brandId = _request.params.id;
  const q = "UPDATE brand SET name = ?, description = ? WHERE id = ?";

  const values = [
    _request.body.name,
    _request.body.description,
  ];
  //to call all values (...values) additionally to this brandId(brandId for Id=?)
  db.query(q, [...values,brandId], (err, data) => {
    if (err) return _response.json(err);
    return _response.json("Brand has been updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
})