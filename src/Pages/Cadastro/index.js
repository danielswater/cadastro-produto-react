
import { useState, useEffect } from 'react';
import './index.css'
import 'react-datepicker/dist/react-datepicker.css';
import CurrencyInput from 'react-currency-input-field';
import DatePicker from 'react-datepicker';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { service } from '../../service/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

function CadastroProduto() {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        data_validade: ''
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePrecoChange = (value) => {
        setFormData({ ...formData, preco: parseFloat(value) });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setFormData({ ...formData, imagem: file })
    }

    const handleSubmit = (event) => {
        //toast.success('ola')
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation()
        }
        else {
            const data = new FormData()
            data.append("nome", formData.nome)
            data.append("descricao", formData.descricao)
            data.append("preco", formData.preco)
            data.append("data_validade", formData.data_validade)
            data.append("imagem", formData.imagem)
            service.postProduto(data)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
            event.preventDefault();
            event.stopPropagation()
        }
        setValidated(true)
    };

    function formatDate(date) {
        return format(date, 'yyyy-mm-dd')
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group >
                <Form.Label>Nome*</Form.Label>
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
                <Form.Label>Descrição*</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Campo descricao é obrigatório.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Preço*</Form.Label>
                <CurrencyInput
                    name="preco"
                    decimalsLimit={2}
                    prefix="R$ "
                    className="form-control form-control-lg"
                    allowNegativeValue={false}
                    value={formData.preco}
                    onValueChange={handlePrecoChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Campo preço é obrigatório.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Data de Validade</Form.Label>
                <Form.Control
                    size="lg"
                    type="date"
                    name="data_validade"
                    value={formData.data_validade}
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Campo data de validade é obrigatório.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Imagem</Form.Label>
                <Form.Control
                    type="file"
                    name='imagem'
                    onChange={handleImageChange}
                />
            </Form.Group>
            <div className='botao'>
                <Button type="submit">Cadastrar Produto</Button>
            </div>
        </Form>
    );
}
export default CadastroProduto;