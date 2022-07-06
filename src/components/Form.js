import { Container} from '@mui/material';
import '../assets/Form.scss'

const Form = (props) =>{
    return (
        <Container maxWidth="sm">
            {props.children}
        </Container>
    )

};

export default Form;