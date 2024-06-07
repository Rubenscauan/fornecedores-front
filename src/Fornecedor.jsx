import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Paper } from '@material-ui/core';
import axios from 'axios';

const Fornecedor = ({ fornecedor }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFornecedorDetails, setEditFornecedorDetails] = useState({
    nome: fornecedor.nome,
    cnpj: fornecedor.cnpj,
    categoria: fornecedor.categoria,
  });

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditFornecedor = () => {
    axios.put('http://localhost:8080/api/fornecedores/' + fornecedor.id, editFornecedorDetails)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Erro ao editar o fornecedor:', error);
      });
    handleCloseEditDialog();
  };

  const deleteFornecedor = (fornecedorId) => {
    const isConfirmed = window.confirm('Tem certeza que deseja excluir este fornecedor?');
    if (isConfirmed) {
      axios.delete('http://localhost:8080/api/fornecedores/' + fornecedorId)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          console.error('Erro ao deletar o fornecedor:', error);
        });
    }
  };

  return (
    <Paper style={{ padding: '10px', marginBottom: '10px' }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={3}>
          <Typography variant="body1">{fornecedor.nome}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{fornecedor.cnpj}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{fornecedor.categoria}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleOpenEditDialog} style={{ marginRight: '10px' }}>Editar</Button>
            <Button variant="contained" color="secondary" onClick={() => deleteFornecedor(fornecedor.id)}>Excluir</Button>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Editar Fornecedor</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={editFornecedorDetails.nome}
            style={{ marginBottom: '20px' }}
            onChange={(e) => setEditFornecedorDetails({ ...editFornecedorDetails, nome: e.target.value })}
          />
          <TextField
            label="CNPJ"
            variant="outlined"
            fullWidth
            value={editFornecedorDetails.cnpj}
            style={{ marginBottom: '20px' }}
            onChange={(e) => setEditFornecedorDetails({ ...editFornecedorDetails, cnpj: e.target.value })}
          />
          <TextField
            label="Categoria"
            variant="outlined"
            fullWidth
            value={editFornecedorDetails.categoria}
            style={{ marginBottom: '20px' }}
            onChange={(e) => setEditFornecedorDetails({ ...editFornecedorDetails, categoria: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditFornecedor} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default Fornecedor;
