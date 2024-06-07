import React, { useState, useEffect } from 'react';
import Fornecedor from './Fornecedor';
import { TextField, Typography, Box, Container, Grid } from '@material-ui/core'; 
import axios from 'axios';

const FornecedorList = () => {  
  const [fornecedores, setFornecedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    axios.get("http://localhost:8080/api/fornecedores")
      .then(response => {
        setFornecedores(response.data);
      })
      .catch(error => alert(error));
  }, []);

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ marginTop: '20px' }}>
      <Container>
        <Box>
          <Typography style={{ display: 'flex', justifyContent: 'center' }}>
            Fornecedores - Pesquisar por nome:
            <TextField
              label="Pesquisar por nome"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginLeft: '10px', marginTop: '-10px' }}
            />
          </Typography>
        </Box>
        <Grid container spacing={2} style={{ marginTop: '10px', fontWeight: 'bold' }}>
          <Grid item xs={3}>
            <Typography variant="h6">Nome</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">CNPJ</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Categoria</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6"></Typography>
          </Grid>
        </Grid>
        <div style={{ marginTop: '10px' }}>
          {filteredFornecedores.map(f => (
            <Fornecedor key={f.id} fornecedor={f} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default FornecedorList;
