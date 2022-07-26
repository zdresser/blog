import React from "react";
import { Container } from "reactstrap";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import IPageProps from "../interfaces/page";

const HomePage: React.FC<IPageProps> = (props) => {
  return (
    <Container fluid className='p-0'>
      <Navigation />
      <Header title='Blog Time' headline='Headline Time' />
      <Container className='mt-5'>Look at all this bloggery</Container>
    </Container>
  );
};

export default HomePage;
