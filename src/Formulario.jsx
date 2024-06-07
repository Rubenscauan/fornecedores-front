import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Container, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';

const Formulario = () => {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [area, setArea] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFornecedor = {
            "nome" : nome,
            "cnpj" : cnpj,
            "categoria" : area
        };
        try {
            axios.post("http://localhost:8080/api/fornecedores", newFornecedor);      
            alert('Novo Fornecedor adicionada com sucesso');
            window.location.reload();
            
        }catch (error) {
            alert('Erro ao processar o fornecedor:', error);
        }
    };

    return (
        <Container >
            <Box >
                <Typography variant="h6" component="h2">
                    Cadastro de Fornecedor
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                variant="outlined"
                                fullWidth
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="CNPJ"
                                variant="outlined"
                                fullWidth
                                value={cnpj}
                                onChange={(e) => setCnpj(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Categoria</InputLabel>
                                <Select
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    label="Categoria"
                                >
                                    <MenuItem value="">
                                        <em>Selecione</em>
                                    </MenuItem>
                                    <MenuItem value="Alimentos">Alimentos</MenuItem>
                                    <MenuItem value="Bebidas">Bebidas</MenuItem>
                                    <MenuItem value="Moveis">Moveis</MenuItem>
                                    <MenuItem value="Carnes">Carnes</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Cadastrar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default Formulario;
