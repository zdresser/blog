import { Link } from "react-router-dom";
import { Navbar, Container, NavbarBrand, Nav } from "reactstrap";

export interface INavigationProps {}

const Navigation: React.FC<INavigationProps> = (props) => {
  return (
    <Navbar color='light' light sticky='top' expands='md'>
      <Container>
        <NavbarBrand tag={Link} to='/'>
          📝
        </NavbarBrand>
        <Nav className='mr-auto' navbar />
      </Container>
    </Navbar>
  );
};

export default Navigation;
