const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());
const axios = require('axios');
const urlUsers = 'https://api-books-ac3j.onrender.com/users';
const urlBooks = 'https://api-books-ac3j.onrender.com/books';

app.get('/users', async (req, res) => {
   try {
    const response = await axios.get(urlUsers);
    const users = response.data;
    const user = users.map((user) => {
        const userBlock = {
            name: user.nombre + ' ' + user.apellidos,
            email: user.correo,
            collection: user.coleccion,
            wishlist: user.wishlist
        }
        return userBlock;
    })
    res.json(user);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

app.get('/books', async (req, res) => {
    try {
        const response = await axios.get(urlBooks);
        const books = response.data;
        const book = books.map((book) => {
            const bookList = {
                title: book.titulo,
                author: book.autor,
                date: book.fechaPublicacion,
                image: book.imagen
            }
            return bookList;
        })
        res.json(book);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
})