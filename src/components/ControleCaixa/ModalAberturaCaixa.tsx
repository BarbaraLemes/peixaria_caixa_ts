import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface ModalAberturaCaixaProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (valorInicial: number) => void;
}

export const ModalAberturaCaixa = ({ open, onClose, onConfirm }: ModalAberturaCaixaProps) => {
    const [valorInicial, setValorInicial] = useState('');

    const handleConfirm = () => {
        const valor = parseFloat(valorInicial);
        if (!isNaN(valor) && valor >= 0) {
            onConfirm(valor);
            setValorInicial('');
            onClose();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Permite apenas números e um ponto decimal
        if (/^\d*\.?\d*$/.test(value)) {
            setValorInicial(value);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Abertura de Caixa</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Valor Inicial do Caixa (R$)"
                    type="text"
                    fullWidth
                    value={valorInicial}
                    onChange={handleChange}
                    placeholder="0.00"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
                <Button 
                    onClick={handleConfirm} 
                    color="primary"
                    disabled={!valorInicial || parseFloat(valorInicial) < 0}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};