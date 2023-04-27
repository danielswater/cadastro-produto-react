
import { useState, useEffect } from 'react';
import './index.css'
import 'react-datepicker/dist/react-datepicker.css';
import CurrencyInput from 'react-currency-input-field';
import DatePicker from 'react-datepicker';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CadastroProduto() {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        dataValidade: ''
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePrecoChange = (value) => {
        setFormData({ ...formData, preco: parseFloat(value) });
    };

    const handleDataValidadeChange = (date) => {
        setFormData({ ...formData, dataValidade: date });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation()
        }

        setValidated(true)
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group >
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    size="lg"
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Campo nome é obrigatório.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Preço</Form.Label>
                <CurrencyInput
                    name="preco"
                    decimalsLimit={2}
                    prefix="R$ "
                    className="form-control form-control-lg"
                    allowNegativeValue={false}
                    value={formData.preco}
                    onValueChange={handlePrecoChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Data de Validade</Form.Label>
                <DatePicker
                    selected={formData.dataValidade}
                    onChange={handleDataValidadeChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control form-control-lg"
                />
            </Form.Group>
            <div className='botao'>
                <Button type="submit">Cadastrar Produto</Button>
            </div>
        </Form>
    );
}
export default CadastroProduto;