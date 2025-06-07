import request from 'supertest';
import server from '../app.js';

describe('Testing unitario con Jest', () => {
    let userId;
    it("Probando el registro de un usuario correcto",async () => {
        const user={
            name: "demostenes",
            last_name: "barraza",
            email: "demobarra@gmail.com",
            age: 24,
            password: "diccionario",
            phone: "+56955554858"
          };
        const response = await request(server)
        .post("/users")
        .send(user)
        .expect("Content-Type", /json/);
        const user2= response.body;
        userId=user2.id;
      expect(user.name).toEqual(user2.name);
    })
    it("Probando agregar estrellas",async ()=>{
        const data={
            stars:3,
            newStars:5
        };
        const response = await request(server)
        .put(`/users/${userId}`)
        .send(data);
        const {body}= response;
      expect('Estrellas actualizadas').toEqual(body.message);
    })
    it("Probando eliminacion de usuario creado",async ()=>{
        const response = await request(server)
        .delete(`/users/${userId}`)
        .send();
        const {body}= response;
      expect('Usuario eliminado correctamente').toEqual(body.message);
    })

    it("Probando el registro de un usuario menor de edad ",async () => {
        const user={
            name: "demostenes",
            last_name: "barraza",
            email: "demobarra@gmail.com",
            age: 14,
            password: "diccionario",
            phone: "+56955554858"
          };
        const response = await request(server)
        .post("/users")
        .send(user);
        const {body}= response;
      expect('Para ingresar debe ser mayor de edad').toEqual(body.message);
    })
})