const express = require('express');
const {getMinNumber, getMaxNumber, getAverageNumber, sortNumbers, countOccurrences} = require('./util.js');

const app = new express();
const port = 3000;

app.get('/number/min', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  const result = getMinNumber(num1, num2);

  res.status(result.status).json(result.data);
});


app.get('/number/max', (req, res) => {
    const num1 = parseFloat (req.query.num1);
    const num2 = parseFloat (req.query.num2);
    
    const result = getMaxNumber(num1,num2);
    res.status(result.status).json(result.data);
}
);


app.get('/number/avg', (req, res) => {
    const numbers = req.query.numbers;
    if (!numbers) {
      return res.status(400).json({ error: 'numbers query parameter is required' });
    }
  
    const numArray = numbers.split(',').map(Number);
    const result = getAverageNumber(numArray);
  
    res.status(result.status).json(result.data);
  });
  


  app.get('/number/sort', (req, res) => {
    const numbers = req.query.numbers;
    const type = req.query.type;
  
    if (!numbers) {
      return res.status(400).json({ error: 'numbers query parameter is required' });
    }
  
    if (!type || (type !== 'asc' && type !== 'desc')) {
      return res.status(400).json({ error: 'type query parameter must be either "asc" or "desc"' });
    }
  
    const numArray = numbers.split(',').map(Number);
    const result = sortNumbers(numArray, type);
  
    res.status(result.status).json(result.data);
  });
  


  app.get('/number/count', (req, res) => {
    const numbers = req.query.numbers;
    const search = req.query.search;
  
    if (!numbers) {
      return res.status(400).json({ error: 'numbers query parameter is required' });
    }
  
    if (!search) {
      return res.status(400).json({ error: 'search query parameter is required' });
    }
  
    const numArray = numbers.split(',');
    const result = countOccurrences(numArray, search);
  
    res.status(result.status).json(result.data);
  });
 


  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });